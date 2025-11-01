"use client";
import React, {useState, useContext, useEffect} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import AuthContext from "../../../context/AuthContext"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [formLoading, setFormLoading] = useState(false)
	const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
	const [resetEmail, setResetEmail] = useState("")
	const [resetLoading, setResetLoading] = useState(false)

	const router = useRouter()

	const { error, isAuthenticated, login, clearErrors, loading } =
		useContext(AuthContext)

	useEffect(() => {
		console.log("isAuthenticated:", isAuthenticated);
		console.log("error:", error);
		if (error) {
			toast.error(error, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			clearErrors()
		}
		if (isAuthenticated) {
			router.push("/app/dashboard")
		}
	}, [isAuthenticated, error, clearErrors, router])

	const submitHandler = async (e) => {
		e.preventDefault()
		setFormLoading(true)
		await login({ username: email, password })
		setFormLoading(false)
	}

	const handleForgotPassword = async (e) => {
		e.preventDefault()
		setResetLoading(true)

		try {
			const response = await axios.post(
				`${process.env.API_URL}/api/password-reset/`,
				{ email: resetEmail }
			)

			toast.success(response.data.message || "Password reset email sent! Check your inbox.")
			setShowForgotPasswordModal(false)
			setResetEmail("")
		} catch (error) {
			toast.error(
				error.response?.data?.error || 
				"Failed to send reset email. Please try again."
			)
		} finally {
			setResetLoading(false)
		}
	}

	return (
		<>
			<ToastContainer />
			
			{/* Forgot Password Modal */}
			{showForgotPasswordModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								Reset Password
							</h3>
							<button
								type="button"
								onClick={() => {
									setShowForgotPasswordModal(false)
									setResetEmail("")
								}}
								className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
							>
								<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Enter your email address and we'll send you a link to reset your password.
						</p>
						
						<form onSubmit={handleForgotPassword}>
							<div className="mb-4">
								<label
									htmlFor="reset-email"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Email Address
								</label>
								<input
									id="reset-email"
									type="email"
									placeholder="Enter your email"
									value={resetEmail}
									onChange={(e) => setResetEmail(e.target.value)}
									className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									required
								/>
							</div>
							
							<div className="flex gap-3">
								<button
									type="button"
									onClick={() => {
										setShowForgotPasswordModal(false)
										setResetEmail("")
									}}
									className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={resetLoading}
									className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
								>
									{resetLoading ? "Sending..." : "Send Reset Link"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={submitHandler}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									Email address
								</label>
								<div className="mt-1">
									<input
										type="email"
										placeholder="Enter Your Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										pattern="\S+@\S+\.\S+"
										title="Your email is invalid"
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-gray-900"
										required
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									Password
								</label>
								<div className="mt-1">
									<input
										type="password"
										placeholder="Enter Your Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-white text-gray-900"
										required
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
									/>
									<label
										htmlFor="remember-me"
										className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
										Remember me
									</label>
								</div>

							<div className="text-sm">
								<button
									type="button"
									onClick={() => setShowForgotPasswordModal(true)}
									className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
									Forgot your password?
								</button>
							</div>
							</div>

							<div>
							<button
								type="submit"
								className="btn-primary-medium"
							>
								{formLoading ? "Authenticating..." : "Login"}
							</button>
							</div>
						</form>

						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full " />
								</div>
								<div className="relative flex justify-center text-sm">
									<p style={{textDecoration: "none"}} className="signup">
										New here?{" "}
										<Link href="/register">Create an account</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPage
