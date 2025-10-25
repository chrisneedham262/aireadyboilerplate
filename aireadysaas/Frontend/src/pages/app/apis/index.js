import React, {useContext} from 'react'
import HeaderApp  from '@/components/nav/app/header';
import Footer from '@/components/nav/footer';
import ApisPage from '@/components/pages/apis';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';


export default function Apis() {
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
    <ApisPage />
    <Footer/>
    </>
  );
}
