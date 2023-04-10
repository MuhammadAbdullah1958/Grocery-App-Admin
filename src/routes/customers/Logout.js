import React from "react";
import { AdminDomain } from "lib/Config";
// import Domain from "../../lib"
import Domain from "lib/Config";
import { useDispatch } from "react-redux";
import * as AuthAction from "auth/store/actions";
import history from "@history";

const Logout = () => {
  const disptach = useDispatch();
  // disptach(AuthAction.loginAdmin(null));
  console.log("Console Logout Called");
  localStorage.clear();
  history.push({
    // pathname: "/admin/login",
  });

  window.location.replace(`/admin/login`);
  return <>loging out...</>;
};

export default Logout;
