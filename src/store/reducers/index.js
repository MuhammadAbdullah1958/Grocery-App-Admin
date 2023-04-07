import { combineReducers } from "redux";
import auth from "../../auth/store/reducers";
import admin from "./admin.reducer";
import appReducer from "./app.reducer";
import customers from "./customer.reducer";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    appReducer,
    admin,
    customers,
    ...asyncReducers,
  });

export default createReducer;
