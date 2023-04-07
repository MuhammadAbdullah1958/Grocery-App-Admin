import React from "react";

import {
  VisitorAreaChartWidget,
  SalesAreaChartWidget,
  OrdersAreaChartWidget,
  RecentOrdersWidget,
  SupportRequest,
} from "components/Widgets";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAdmin } from "store/actions";
import { useEffect } from "react";
// widgets data
import { visitorsData, salesData, ordersData } from "./data";

export default function EcommerceDashboard() {

  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(getOrdersAdmin());
  }, [])

  const response = useSelector((state)=>state);
  console.log("response:", response)

  const totalOrders = response?.admin?.Orders?.totalOrders;
  console.log("total orders:", totalOrders);

  // console.log("Local",localStorage.getItem("jwt-token"));
  // console.log(jwt_access_token);
  return (
    <div className="ecom-dashboard-wrapper">
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i className="ti-angle-left"></i>
          <h2 className="">Dashboard</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-4 w-xs-half-block">
          <VisitorAreaChartWidget data={visitorsData} />
        </div>
        <div className="col-sm-12 col-md-4 w-xs-half-block">
          <OrdersAreaChartWidget data={ordersData} />
        </div>
        <div className="col-sm-6 col-md-4 w-xs-full">
          <SalesAreaChartWidget data={salesData} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4 w-xs-full">
          <div className="rct-block overflow-hidden">
            <div className="rct-block-title">
              <h4>Order counter</h4>
            </div>
            <SupportRequest />
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-8 w-xs-full">
          <div className="rct-block">
            <div className="rct-block-title">
              <h4>Recent Orders</h4>
            </div>
            <RecentOrdersWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
