import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Actions from "store/actions";
import EditCustTemp from "./EditCustTemp";
import { Button } from "reactstrap";

const EditCustomer = (props) => {
  const dispatch = useDispatch();
  const customerId = parseInt(props.match.params.id);

  const customerData = useSelector(({ customers }) => customers);

  useEffect(() => {
    dispatch(Actions.CustomerLoading(true));
    dispatch(Actions.customerDetailAdmin(customerId));
  }, [dispatch, customerId]);

  if (customerData && customerData.error) {
    return (
      <div
        className="page-loader d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <h2>Error! Why Cannot fetch customer.</h2>
        <Button color="danger" className="mt-3" onClick={props.history.goBack}>
          Back
        </Button>
      </div>
    );
  }

  if (customerData === null || !customerData.customerDetail) {
    return (
      <div
        className="page-loader d-flex justify-content-center mb-30"
        style={{ height: "500px" }}
      >
        <CircularProgress style={{ margin: "auto" }} />
      </div>
    );
  }
  return (
    <div className="formelements-wrapper">
      <div className="page-title">
        <div className="page-title-wrap">
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
          <h2 className="">Edit Customer</h2>
        </div>
      </div>
      <EditCustTemp
        cust={customerData.customerDetail}
        Loading={customerData.Loading}
        key={customerData.id}
        {...props}
      />
    </div>
  );
};

export default EditCustomer;

