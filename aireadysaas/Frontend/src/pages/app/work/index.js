"use client";
import React, {useContext} from 'react'
import WorkPages from '../../../components/pages/work/index';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';


export default function Work() {
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
     
    <WorkPages />
    </>
  );
}

