import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import "./lib/reactifyCss";
import Layout from "components/layout";
import routerService from "services/_routeServices";
import { useSelector } from "react-redux";
import History from "@history";
import AdminLogin from "components/loginpage/AdminLogin";
import axios from "axios";

function App(props) {
  const token = localStorage.getItem("jwt-token")
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const authCheck = useSelector(({ auth }) => {   
    // auth containers 2 objects: login and user / called from actions.index
    return auth.login.success ? auth.user : false;
  });

  const response = useSelector((state)=>state);
  console.log("auth check:", response)

  //just for development
  //const authCheck = true;

  useEffect(() => {
    // if (authCheck === false) {
      if (authCheck === false) {
      History.push({
        pathname: "/admin/login"
      });
    }
  }, [authCheck]);

  const getUrl = (pathname) => {
    return pathname === "/admin/login" ? true : false;
  };

  const { location } = props;

  return (
    <div className="App">
      <NotificationContainer />
      <Switch>
        {getUrl(location.pathname) ? (
          <Route
            exact
            path="/admin/login"
            render={(props) => <AdminLogin {...props} />}
          />
        ) : (
          <>
            <Layout>
              {routerService &&
                routerService.map((route, key) => (
                  <Route
                    key={key}
                    path={`/admin/${route.path}`}
                    component={route.component}
                  />
                ))}
            </Layout>
            {/* {<Route component={PageNotFound} />} */}
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
