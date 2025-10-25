import React, { useContext } from 'react'
import ProfilePage from '../../../components/pages/profile'
import AuthContext from '../../../context/AuthContext'
import NotAuthenticated from '../../NotAuthenticated';

export default function Profile() {
  const {  user } = useContext(AuthContext); // Ensure 'user' is obtained from context

  if (!user) {
    return (
      <>
        <NotAuthenticated />
      </>
    );
  }

  return (
    
    
    <ProfilePage />
   
  )
}


