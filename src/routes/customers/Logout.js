import React from 'react'
import { AdminDomain } from 'lib/Config';
import { useDispatch } from 'react-redux'
import * as AuthAction from "auth/store/actions";

const Logout = () => {
    const disptach = useDispatch();
    // disptach(AuthAction.loginAdmin(null));
    console.log("Console Logout Called")
    localStorage.clear();
    window.location.replace(`${AdminDomain}/admin/login`)
  return (
    <>
        loging out...
    </>
  )
}

export default Logout