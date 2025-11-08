"use client";
import React, {useContext} from 'react'
import DashboardPages from '../../../components/pages/dashboard/index';
import HeaderApp  from '@/components/nav/app/header';
import Footer from '@/components/nav/footer';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';
import CustomerServicePage from '@/components/pages/customer-service';


export default function CustomerService() {
  const { user, loading } = useContext(AuthContext); // Ensure 'user' and 'loading' are obtained from context

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <NotAuthenticated />
      </>
    );
  }

  return (
    <>
      <HeaderApp/> 
    <CustomerServicePage />
    <Footer/>
    </>
  );
}

