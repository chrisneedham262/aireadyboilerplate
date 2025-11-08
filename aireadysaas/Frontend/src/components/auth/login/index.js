"use client";
import React, {useState, useContext, useEffect} from "react"
import {useRouter} from "next/router"
import Link from "next/link"
import AuthContext from "../../../context/AuthContext";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const router = useRouter()

	const { error, isAuthenticated, login, clearErrors, loading } =
		useContext(AuthContext)

	useEffect(() => {
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

	const submitHandler = (e) => {
		e.preventDefault()
		login({username: email, password})
	}

	return (
		<>
			<ToastContainer />
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={submitHandler}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700">
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
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										required
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<div className="mt-1">
									<input
										type="password"
										placeholder="Enter Your Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
										className="ml-2 block text-sm text-gray-900">
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<a
										href="#"
										className="font-medium text-indigo-600 hover:text-indigo-500">
										Forgot your password?
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="btn-primary-medium">
									{loading ? "Authenticating..." : "Login"}
								</button>
							</div>
						</form>

						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300" />
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
