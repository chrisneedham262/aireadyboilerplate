"use client";
import React, {useContext} from 'react'
import DashboardPages from '../../../components/pages/dashboard/index';
import HeaderApp  from '@/components/nav/app/header';
import Footer from '@/components/nav/footer';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';
import CustomerServicePage from '@/components/pages/customer-service';


export default function CustomerService() {
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
      <HeaderApp/> 
    <CustomerServicePage />
    <Footer/>
    </>
  );
}

