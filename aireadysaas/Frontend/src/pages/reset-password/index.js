"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPasswordPage() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState("");
	const [success, setSuccess] = useState(false);
	
	const router = useRouter();

	useEffect(() => {
		// Get token from URL query parameter
		if (router.query.token) {
			setToken(router.query.token);
		}
	}, [router.query]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return;
		}

		setLoading(true);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/api/password-reset-confirm/`,
				{
					token: token,
					password: password,
				}
			);

			toast.success(response.data.message);
			setSuccess(true);
			
			// Redirect to login after 3 seconds
			setTimeout(() => {
				router.push("/login");
			}, 3000);
			
		} catch (error) {
			toast.error(
				error.response?.data?.error || 
				"Failed to reset password. The link may be expired or invalid."
			);
		} finally {
			setLoading(false);
		}
	};

	if (!token) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						Invalid Reset Link
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						The password reset link is invalid or has expired.
					</p>
					<Link 
						href="/login"
						className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
					>
						Return to Login
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<ToastContainer />
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						Reset Your Password
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
						Enter your new password below
					</p>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
						{success ? (
							<div className="text-center">
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									<svg
										className="h-6 w-6 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
									Password Reset Successful!
								</h3>
								<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Redirecting you to login...
								</p>
							</div>
						) : (
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>
										New Password
									</label>
									<div className="mt-1">
										<input
											id="password"
											type="password"
											placeholder="Enter new password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											required
											minLength={6}
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="confirmPassword"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300"
									>
										Confirm New Password
									</label>
									<div className="mt-1">
										<input
											id="confirmPassword"
											type="password"
											placeholder="Confirm new password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											required
											minLength={6}
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										disabled={loading}
										className="btn-primary-medium"
									>
										{loading ? "Resetting..." : "Reset Password"}
									</button>
								</div>
							</form>
						)}

						<div className="mt-6">
							<div className="relative flex justify-center text-sm">
								<Link
									href="/login"
									className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
								>
									Back to Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

