"use client"

import react , { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Head from "next/head"
import HomePage from "@/components/pages/home";
import Dashboard from "@/components/pages/dashboard";


export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
    	<Head>
				<title>Launch Software in days, not weeks | launch software fast</title>
				<meta
					name="description"
					content="We provide web development boilerplates for a range of different software choices.  Our goal is to deliver software fast for people with little or no coding experience."
				/>
				<meta
					name="keywords"
					content="web developement, ai applications, software development, launch software"
				/>
				<meta
					property="og:title"
					content="Boilerplate software| next.js, python, react, django -  Launch Software Fast"
				/>
				<meta
					property="og:description"
					content="We create amazing software boilerplates using tech like next.js, python, react, django"
				/>
			</Head>
    
    {isAuthenticated ? <Dashboard /> : <HomePage />}
    </>
  );
}


// export async function getServerSideProps({req}) {
// 	const access_token = req.cookies.access || null

// 	return {
// 		props: {
// 			access_token,
// 		},
// 	}
// }
