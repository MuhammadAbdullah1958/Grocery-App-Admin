import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import SidebarContent from "./SidebarContent";
import UserBlock from "./UserBlock";

function Sidebar() {
  return (
    <Fragment>
      <div className="rct-sidebar">
        <div className="rct-sidebar-content sidebar-overlay-dark">
          <div className="site-logo">
            <Link
              to="/admin/dashboard"
              className="logo-normal mt-1 "
              style={{ width: "100%" }}
            >
              <img
                src={require("assets/img/jiffy-logo.png")}
                className="img-fluid m-2"
                alt="site-logo"
                width="100"
              />
            </Link>
          </div>
          <div className="rct-sidebar-wrap">
            <Scrollbars
              className="rct-scroll"
              autoHide
              autoHideDuration={100}
              style={{ height: "calc(100vh - 60px)" }}
            >
            <SidebarContent />
            {/* <UserBlock /> */}
            </Scrollbars>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Sidebar;

