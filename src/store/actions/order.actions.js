import Domain from "lib/Config";
import axios from "axios";
import { NotificationManager } from "react-notifications";
export const GET_ORDERS_ADMIN = "[ADMIN] GET_ORDERS_ADMIN";
export const ADMIN_ORDER_LOADING = "[ADMIN] ADMIN_ORDER_LOADING";
export const ADMIN_ORDER_ERROR = "[ADMIN] ADMIN_ORDER_ERROR";
export const ORDERS_DETAIL_ADMIN = "[ADMIN] ORDERS_DETAIL_ADMIN";
export const ORDER_DETAIL_LOADING = "[ADMIN] ORDER_DETAIL_LOADING";
export const ADMIN_UPDATE_ORDER = "[ADMIN] ADMIN_UPDATE_ORDER";
export const ORDERS_COUNT_GRAPH = "[ADMIN] ORDERS_COUNT_GRAPH";
export const LOADING_COUNT_GRAPH = "[ADMIN] LOADING_COUNT_GRAPH";
export const GET_TAX_DATA = "[ADMIN] GET_TAX_DATA";
export const TAX_LOADING = "[ADMIN] TAX_LOADING";
export const EDIT_TAX = "[ADMIN] EDIT_TAX";

export function getAdminTaxData(variables) {
  const request = axios.post(`${Domain}/api/admin/getTaxData`, { variables });

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: GET_TAX_DATA,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Error! Cannot fetch tax data");
      });
}
export function adminTaxLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: TAX_LOADING,
      payload: val,
    });
  };
}
export function framingOrdersAdmin(page, variables) {
  const request = axios.post(
    `${Domain}/api/admin/framingOrdersAdmin`,
    { variables },
    {
      params: { page },
    }
  );

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: GET_ORDERS_ADMIN,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        return dispatch({
          type: ADMIN_ORDER_ERROR,
          payload:
            error.response && error.response.data.msg
              ? error.response.data.msg
              : "Error! Cannot get orders",
        });
      });
}
export function editFramingOrderAdmin(data) {
  const request = axios.put(`${Domain}/api/admin/editFramingOrderAdmin`, data);

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_UPDATE_ORDER,
        });
      })
      .then(() => dispatch(orderDetailAdmin(data.id)))
      .then(() => NotificationManager.success("Order updated successfully"))
      .catch((error) => {
        dispatch(OrderDetailLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Error! Cannot update order");
      });
}

// get order from client
export function getOrdersAdmin(variables) {
  console.log("variables:", variables)
  let filter =0 , page = 0;
  if(variables!==undefined){
    filter = variables?.filter;
    page = variables?.page;
  }
   
  const request = axios.post(
    `${Domain}/api/order/list`
    ,{
      limit: 10,
      page: page,
      id: filter
    },
  );
    console.log("Order Response:", request)
    
  return (dispatch) =>
    request
      .then((response) => {
        console.log("Response:", response)
        
        return dispatch({
          type: GET_ORDERS_ADMIN,
          payload: response?.data?.result,
        });
      })
      .catch((error) => {
        dispatch(adminOrderLoading(false));
        console.log("Order Action:", error)
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Error! Cannot fetch orders");
      });
}

export function adminOrderLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: ADMIN_ORDER_LOADING,
      payload: val,
    });
  };
}

// Single order detial
export function orderDetailAdmin(id) {
  const request = axios.get(`${Domain}/api/order/orderDetails/${id}`, {
    params: { id },
  });

  return (dispatch) =>
    request
      .then((response) => {
        console.log("Response:", response)
        
        return dispatch({
          type: ORDERS_DETAIL_ADMIN,
          payload: response?.data?.result,
        });
      })
      .catch((error) => {
        console.log("Error:", error)
        dispatch(OrderDetailLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Error! Cannot fetch orders");
      });
}

export function OrderDetailLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: ORDER_DETAIL_LOADING,
      payload: val,
    });
  };
}

// confirm order
export function adminUpdateOrder(data) {
  console.log("data:", data)
  const {status} = data;
  console.log("status:", status)
  const request = axios.post(`${Domain}/api/order/update/${data?.id}`, {
  status: status
  });

  return (dispatch) =>
    request
      .then((response) => {
        console.log("response:", response)
        return dispatch({
          type: ADMIN_UPDATE_ORDER,
        });
      })
      // .then(() => dispatch(orderDetailAdmin(data.id)))
      .then(()=>dispatch(getOrdersAdmin()))
      .catch((error) => {
        console.log("Error:", error)
        dispatch(OrderDetailLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Error! Cannot update order");
      });
}
