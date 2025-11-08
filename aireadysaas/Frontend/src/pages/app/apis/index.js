import React, {useContext} from 'react'
import HeaderApp  from '@/components/nav/app/header';
import Footer from '@/components/nav/footer';
import ApisPage from '@/components/pages/apis';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';


export default function Apis() {
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
    <ApisPage />
    <Footer/>
    </>
  );
}
