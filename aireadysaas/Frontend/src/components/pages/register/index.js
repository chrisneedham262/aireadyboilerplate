"use client";

import React, {useState, useContext, useEffect} from "react"
import {useRouter} from "next/navigation"
import AuthContext from "../../../context/AuthContext";
import {toast} from "react-toastify"


export default function RegisterPage() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const router = useRouter()

	const {loading, error, isAuthenticated, register, clearErrors} =
		useContext(AuthContext)

	useEffect(() => {
		if (error) {
			toast.error(error)
			clearErrors()
		}

		if (isAuthenticated && !loading) {
			router.push("/app/dashboard")
		}
	}, [isAuthenticated, error, loading, router, clearErrors])

	const submitHandler = (e) => {
		e.preventDefault()
		register({firstName, lastName, email, password})
	}
	return (
		<>
	
			<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">

				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						Register for an account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
						<span className="font-medium text-indigo-600 dark:text-indigo-400">
							Start your 30 day free trial, no credit cards, no obligation.
						</span>
					</p>
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={submitHandler}>
							<div>
								<label
									htmlFor="first_name"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									First Name
								</label>
								<div className="mt-1">
									<input
										id="first_name"
										placeholder="Enter First Name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="last_name"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									Last Name
								</label>
								<div className="mt-1">
									<input
										id="last_name"
										type="text"
										placeholder="Enter Last name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
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
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
										minLength={6}
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="btn-primary-medium">
									{loading ? "Loading..." : "Register"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
