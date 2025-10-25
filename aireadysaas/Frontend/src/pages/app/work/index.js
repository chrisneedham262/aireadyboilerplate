"use client";
import React, {useContext} from 'react'
import WorkPages from '../../../components/pages/work/index';
import AuthContext from "../../../context/AuthContext"
import NotAuthenticated from '../../NotAuthenticated';


export default function Work() {
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
     
    <WorkPages />
    </>
  );
}

