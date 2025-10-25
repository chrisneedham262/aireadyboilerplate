import React from 'react'
import Link from 'next/link'
import  Footer  from '@/components/nav/footer';
import HeaderApp from '@/components/nav/app/header';
import BannerProfile from '@/components/banners/profile';
import Chatbot from "@/components/agents/Chatbot";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function DashboardPage() {
    return (
     
        <div> 
              <HeaderApp/> 
          <div className="mt-10">
            <BannerProfile/>
          </div>
          <Footer/>
        </div>
    );
  }
  