"use client";
import React, {useContext} from 'react'
import DashboardPages from '../../../components/pages/dashboard/index';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';


export default function Dashboard() {
  const {  user } = useContext(AuthContext); // Ensure 'user' is obtained from context

  if (!user) {
    return (
      <>
        <NotAuthenticated />
      </>
    );
  }

  return (
    <>
      
    <DashboardPages />
   
    </>
  );
}

