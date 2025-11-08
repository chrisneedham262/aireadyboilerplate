import axios from "axios";
import { useState, useEffect, createContext, useCallback } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children, initialAccessToken }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [error, setError] = useState(null);
	const [accessToken, setAccessToken] = useState(initialAccessToken || null);
	const [refreshToken, setRefreshToken] = useState(null);

	const router = useRouter();

	const loadUser = useCallback(async (token) => {
		try {
			const res = await axios.get(`${process.env.API_URL}/api/me/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.data.id) {
				setUser(res.data);
				setIsAuthenticated(true);
				
				// Also load user profile with avatar
				await loadUserProfile(token);
				
				return true;
			}
		} catch (error) {
			console.error("Error loading user:", error);
			setUser(null);
		}
		return false;
	}, []);

	const loadUserProfile = useCallback(async (token) => {
		try {
			const res = await axios.get(`${process.env.API_URL}/api/user-profile/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (res.data) {
				setUserProfile(res.data);
			}
		} catch (error) {
			console.error("Error loading user profile:", error);
		}
	}, []);

	const updateUserProfile = useCallback(async (textData, avatarFile) => {
		try {
			const token = accessToken || Cookies.get("access");
			if (!token) {
				throw new Error("No access token available");
			}

			// First, update text fields using the new text-only endpoint
			const textRes = await axios.put(
				`${process.env.API_URL}/api/user-profile/text/`, 
				textData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			// Then, if there's an avatar file, upload it to the avatar-only endpoint
			if (avatarFile && avatarFile instanceof File) {
				const formData = new FormData();
				formData.append("avatar", avatarFile);

				const avatarRes = await axios.put(
					`${process.env.API_URL}/api/user-profile/avatar/`, 
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				// Use avatar response as it has the latest data (includes text + new avatar)
				if (avatarRes.data) {
					setUserProfile(avatarRes.data);
					return { success: true, data: avatarRes.data };
				}
			} else {
				// No avatar update, use text response
				if (textRes.data) {
					setUserProfile(textRes.data);
					return { success: true, data: textRes.data };
				}
			}

		} catch (error) {
			console.error("Error updating user profile:", error);
			return { 
				success: false, 
				error: error.response?.data || "Failed to update profile" 
			};
		}
	}, [accessToken]);

	const updateToken = useCallback(async () => {
		try {
			const storedRefreshToken = Cookies.get("refresh");
			if (!storedRefreshToken) {
				return null;
			}

			const res = await axios.post(`${process.env.API_URL}/api/token/refresh/`, {
				refresh: storedRefreshToken,
			});

			if (res.data.access) {
				const newAccess = res.data.access;
				setAccessToken(newAccess);
				Cookies.set("access", newAccess, { expires: 1 / 6 }); // Expires in 4 hours
				return newAccess;
			}
		} catch (error) {
			// Silently handle failed refresh - clear cookies and reset state
			Cookies.remove("access");
			Cookies.remove("refresh");
			setIsAuthenticated(false);
			setUser(null);
			setUserProfile(null);
			setAccessToken(null);
			setRefreshToken(null);
		}
		return null;
	}, []);

	useEffect(() => {
		const initializeAuth = async () => {
			setLoading(true);
			let token = initialAccessToken || Cookies.get("access");
			let refreshToken = Cookies.get("refresh");

			// If we have an access token, try to use it
			if (token) {
				setAccessToken(token);
				if (refreshToken) {
					setRefreshToken(refreshToken);
				}
				
				const success = await loadUser(token);
				if (success) {
					setIsAuthenticated(true);
				} else {
					// Access token invalid, try refresh if we have one
					if (refreshToken) {
						const newToken = await updateToken();
						if (newToken) {
							const retrySuccess = await loadUser(newToken);
							if (retrySuccess) {
								setIsAuthenticated(true);
							} else {
								// Still failed, clear everything
								Cookies.remove("access");
								Cookies.remove("refresh");
								setIsAuthenticated(false);
								setUser(null);
								setUserProfile(null);
								setAccessToken(null);
								setRefreshToken(null);
							}
						} else {
							// Refresh failed, clear everything
							Cookies.remove("access");
							Cookies.remove("refresh");
							setIsAuthenticated(false);
							setUser(null);
							setUserProfile(null);
							setAccessToken(null);
							setRefreshToken(null);
						}
					} else {
						// No refresh token to try, just clear
						Cookies.remove("access");
						setIsAuthenticated(false);
						setUser(null);
						setUserProfile(null);
						setAccessToken(null);
					}
				}
			} else if (refreshToken) {
				// No access token but there's a refresh token
				// This is likely a stale cookie - just clear it silently
				// Don't attempt API call since it will likely fail
				Cookies.remove("refresh");
				setIsAuthenticated(false);
				setUser(null);
				setUserProfile(null);
				setAccessToken(null);
				setRefreshToken(null);
			} else {
				// No tokens at all - user is simply not authenticated
				setIsAuthenticated(false);
				setUser(null);
				setUserProfile(null);
				setAccessToken(null);
				setRefreshToken(null);
			}

			setLoading(false);
		};

		initializeAuth();
	}, [initialAccessToken, loadUser, updateToken]);

	useEffect(() => {
		const refreshInterval = setInterval(async () => {
			if (isAuthenticated) {
				const newToken = await updateToken();
				if (newToken) {
					await loadUser(newToken);
				}
			}
		}, 4 * 60 * 1000); // Refresh every 4 minutes

		return () => clearInterval(refreshInterval);
	}, [isAuthenticated, loadUser, updateToken]);

	const login = async ({username, password}) => {
		try {
			setLoading(true);
			setError(null);

			const res = await axios.post(`${process.env.API_URL}/api/token/`, {
				username,
				password,
			});

			if (res.data.access) {
				const access = res.data.access;
				const refresh = res.data.refresh;
				Cookies.set('access', access, { expires: 1/6 }); // expires in 4 hours
				Cookies.set('refresh', refresh, { expires: 7 }); // expires in 7 days
				setAccessToken(access);
				setRefreshToken(refresh);
				await loadUser(access);
				//router.push("/app/dashboard");  // redirect to dashboard if needed
				router.push("/");
			}
		} catch (error) {
			var errorMessage = error.response?.data?.error;
			if (error.response?.data?.non_field_errors) {
				errorMessage = error.response?.data?.non_field_errors[0];
			}
			setError(errorMessage || "An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	const register = useCallback(async ({firstName, lastName, email, password}) => {
		try {
			setLoading(true)
			setError(null) // Clear any previous errors

			const res = await axios.post(`${process.env.API_URL}/api/register/`, {
				first_name: firstName,
				last_name: lastName,
				email,
				password
			})

			if (res.data.message) {
				router.push("/login")
			}
		} catch (error) {
			console.log(error.response)
			setError(
				error.response &&
					(error.response.data.detail || error.response.data.error)
			)
		} finally {
			setLoading(false) // Always set loading to false
		}
	}, [router])
	const logout = useCallback(async () => {
		// Clear state immediately to prevent loading spinners
		setIsAuthenticated(false);
		setUser(null);
		setUserProfile(null);
		setAccessToken(null);
		setRefreshToken(null);
		setLoading(false);
		
		// Clear cookies (aggressively across common paths/domains)
		try {
			const removeCookieEverywhere = (name) => {
				try { Cookies.remove(name); } catch (_) {}
				try { Cookies.remove(name, { path: '/' }); } catch (_) {}
				if (typeof window !== 'undefined') {
					const host = window.location.hostname;
					try { Cookies.remove(name, { domain: host, path: '/' }); } catch (_) {}
					// Also attempt with a leading dot for subdomain cookies
					try { Cookies.remove(name, { domain: `.${host}`, path: '/' }); } catch (_) {}
				}
			};

			removeCookieEverywhere('access');
			removeCookieEverywhere('refresh');
		} catch (_) {}
		
		// Redirect to home page immediately
		router.push("/");
		
		// Do cleanup in background (don't await to prevent delays)
		try {
			const currentRefreshToken = Cookies.get("refresh");
			if (currentRefreshToken) {
				axios.post(`${process.env.API_URL}/api/logout/`, {
					refresh: currentRefreshToken
				}).catch(error => console.error('Background logout error:', error));
			}
		} catch (error) {
			console.error('Logout cleanup error:', error);
		}
	}, [router]);

	const clearErrors = () => {
		setError(null)
	}


	return (
		<AuthContext.Provider
			value={{
				loading,
				user,
				userProfile,
				setUserProfile,
				error,
				isAuthenticated,
				accessToken,
				refreshToken,
				register,
				login,
				logout,
				clearErrors,
				loadUserProfile,
				updateUserProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
