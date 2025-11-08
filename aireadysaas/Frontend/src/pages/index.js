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
