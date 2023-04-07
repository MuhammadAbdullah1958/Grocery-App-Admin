import axios from "axios";
import jwtDecode from "jwt-decode";
import Utils from "./eventemitter";
import Domain from "lib/Config";

class jwtService extends Utils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  signInAdmin = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Domain}/api/user/login`, { email, password })
        .then((response) => {
          console.log("response:", response)
          localStorage.setItem("jwt-token", response?.data?.result?.tokenInfo)
          debugger
          if (response.status==200) {
            this.setSession(response.data.result.tokenInfo);
            resolve(response.data.result.clientInfo);
          } else {
            return reject(response);
          }
        })
        .catch((error) => {
          console.log("Error:", error)
          return error.response
            // ? reject(error?.response.data.msg)
            ? reject("Incorrect Credentials")
            : reject("Network Error");
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Domain}/api/user/validate`)
        .then((response) => {
          if (response.data.result.user) {
            this.setSession(response.data.result.tokenInfo);
            resolve(response.data.result.user);
          } else {
            reject(response.data.result.error);
          }
        })
        .catch(() => reject("Validation Failed"));
    });
  };

  setSession = (tokenInfo) => {
    debugger
    if (tokenInfo) {
      console.log("TOken Info:", tokenInfo)
      // debugger
      localStorage.setItem("jwt_access_token", tokenInfo);
      // debugger
      axios.defaults.headers.common["Authorization"] = "Bearer " + tokenInfo;
      console.log("TOken Info:", axios.defaults.headers.common["Authorization"])
      // debugger
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (tokenInfo) => {
    if (!tokenInfo) {
      return false;
    }
    const decoded = jwtDecode(tokenInfo);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new jwtService();

export default instance;

