import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Input } from "reactstrap";
import * as AuthAction from "auth/store/actions";
import history from "@history";
import "./loginStyle.css";
import "animate.css";
import Domain from "lib/Config";

function AdminLogin() {
  var oldURL = document.referrer;
  console.log("Old url:", oldURL)
  const dispatch = useDispatch();

  const allResponse = useSelector((state)=>state);
  console.log("All Response:", allResponse)

  const loading = useSelector(({ auth }) => auth.login.loading);
  const Auth = useSelector(({ auth }) => {
    console.log("Auth:", auth)
    return auth.login.success ? auth.user : false;
  });
  console.log("Auth Admin login:", Auth)
  useEffect(() => {
    if (Auth && Auth.role === "guest") {
      history.push({
        pathname: "/admin/dashboard",
      });
    }
  }, [Auth]);
  const onSubmitLogin = (e) => {
    e.preventDefault();
    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(AuthAction.loginLoading(true));
    dispatch(AuthAction.loginAdmin(data));
  };
  return (
    <div >
      {loading && <LinearProgress />}
      <div className="main-container">
        <div className="bg-div">
          <div className="bg-content animated bounceInLeft">
            <div className="mb-5">
              <img
                src={require("assets/img/jiffy-logo.png")}
                className="img-fluid"
                alt="site-logo"
                width="220"
              />
            </div>
            <h6 className="lorem-h6">
              At Infinity Bits, we have developed an E-commerce Marketplace with
              featured support of managing Sellers and Buyers specific to a
              business. The idea is to help people who are interested in
              launching dedicated online stores with full-featured control to
              digitize their routine business by utilizing e-commerce apps.
            </h6>
          </div>
        </div>
        <div className="login-panel">
          <div className="login-content">
            <div className="tabs-div">
              <h2 className="text-center title-login">Admin Login</h2>
              <Form onSubmit={(e) => onSubmitLogin(e)}>
                <FormGroup className="has-wrapper">
                  <Input
                    type="email"
                    name="email"
                    id="user-mail"
                    className="has-input input-lg theinputs"
                    placeholder="Enter Email"
                    // value="uzairsaeed2015@gmail.com"
                    required
                  />
                  <span className="has-icon">
                    <i className="ti-user"></i>
                  </span>
                </FormGroup>
                <FormGroup className="has-wrapper">
                  <Input
                    type="Password"
                    name="password"
                    id="pwd"
                    className="has-input input-lg theinputs"
                    placeholder="Password"
                    // value="uzair1999"
                    required
                  />
                  <span className="has-icon">
                    <i className="ti-lock"></i>
                  </span>
                </FormGroup>
                <FormGroup className="mb-15">
                  <Button
                    type="submit"
                    // color="primary"
                    style={{backgroundColor:"#b02e46"}}
                    className="btn-block text-white w-100"
                    variant="contained"
                    size="large"
                    disabled={loading}
                  >
                    Sign In
                  </Button>
                </FormGroup>
              </Form>
              <div className="text-center">
                <a href={Domain} style={{ color: "#192d3e" }}>
                  Go back home?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
