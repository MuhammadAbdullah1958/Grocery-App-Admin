/**
 * User Block Component
 */
import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
import * as AuthActions from "auth/store/actions";
import { useDispatch, useSelector } from "react-redux";
import Domain from "lib/Config";

function UserBlock() {
  const dispatch = useDispatch();
  const Auth = useSelector(({ auth }) => {
    return auth.login.success ? auth.user : false;
  });
  const [userDropdownMenu, setUserDropdownMenu] = useState(false);

  if (Auth === false) {
    return null;
  }

  const toggleUserDropdownMenu = () => {
    setUserDropdownMenu(!userDropdownMenu);
  };
  const logoutUser = (e) => {
    dispatch(AuthActions.logoutUser());
  };
  return (
    <div className="top-sidebar">
      <div className="sidebar-user-block">
        <Dropdown
          isOpen={userDropdownMenu}
          toggle={() => toggleUserDropdownMenu()}
          className="rct-dropdown"
        >
          <DropdownToggle
            tag="div"
            className="d-flex justify-content-center align-items-center"
          >
            <div className="user-info">
              <span className="user-name">{Auth.fullName}</span>
              <i className="zmdi zmdi-chevron-down dropdown-icon ml-3"></i>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <ul className="list-unstyled mb-0">
              <li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
                <p className="text-white mb-0 fs-14">{Auth.fullName}</p>
                <span className="text-white fs-14">{Auth.username}</span>
              </li>
              <li>
                <Link to="/admin/profile">
                  <i className="zmdi zmdi-account text-primary mr-3"></i>
                  <span>Profile</span>
                </Link>
              </li>
              <li className="border-top">
                <a href="#" onClick={(e) => logoutUser(e)}>
                  <i className="zmdi zmdi-power text-danger mr-3"></i>
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserBlock;
