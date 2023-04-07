import React, { useState, useEffect } from "react";
import "./tagStyles.css";
import { Button } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "store/actions";
import { LinearProgress } from "@material-ui/core";
import { Img } from "react-image";
import CircularProgress from "@material-ui/core/CircularProgress";

const TemplateList = (props) => {
  const dispatch = useDispatch();
  const [sendGridTemplate, setSendGridTemplate] = useState(null);
  const [selectedTemp, setSelectedTemp] = useState(null);
  useEffect(() => {
    console.log("sending request to SendGrid");
    dispatch(Actions.getTemplatesLoading(true));
    dispatch(Actions.getSendGridTemplates());
  }, [dispatch]);
  const SendGridTemplateData = useSelector(
    ({ admin }) => admin.SendGridTemplates
  );
  const BulkMailLoading = useSelector(({ admin }) => admin.BulkMailLoading);
  useEffect(() => {
    setSendGridTemplate(SendGridTemplateData);
  }, [SendGridTemplateData]);
  const selectFunc = (TempId) => {
    setSelectedTemp(TempId);
  };
  const sendMailFunc = () => {
    if (selectedTemp === null) {
      return NotificationManager.warning("Please select Template");
    }
    const customerFilters = JSON.parse(localStorage.getItem("customerfilters"));
    console.log(customerFilters);
    dispatch(Actions.bulkMailLoading(true));
    dispatch(Actions.sendBulkMail(selectedTemp, customerFilters));
    return;
  };
  console.log(sendGridTemplate);
  if (sendGridTemplate === null) {
    return (
      <div
        className="page-loader d-flex justify-content-center mb-30"
        style={{ minHeight: "300px" }}
      >
        <CircularProgress style={{ margin: "auto" }} />
      </div>
    );
  }
  if (sendGridTemplate.errors) {
    return (
      <div
        className="page-loader d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <h2>Error! Cannot fetch templates.</h2>
        <Button color="danger" className="mt-3" onClick={props.history.goBack}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-title d-flex justify-content-between align-items-center">
        <div className="page-title-wrap">
          <i
            style={{ cursor: "pointer" }}
            onClick={props.history.goBack}
            className="ti-angle-left"
          ></i>
          <h2 className="">Template List</h2>
        </div>
      </div>
      <div className="container">
        <div className="rct-block">
          {BulkMailLoading && <LinearProgress />}
          <div className="cust-info-header d-flex justify-content-between align-items-center">
            <span></span>
            <span>Choose Template</span>
            <div className="temp-btn-div mx-2 text-white">
              <Button
                outline
                color="success"
                onClick={sendMailFunc}
                disabled={BulkMailLoading}
              >
                Send
              </Button>
            </div>
          </div>
          <div className="rct-block-content">
            {sendGridTemplate.Loading ? (
              <div
                className="page-loader d-flex justify-content-center mb-30"
                style={{ minHeight: "300px" }}
              >
                <CircularProgress style={{ margin: "auto" }} />
              </div>
            ) : (
              <div className="d-flex justify-content-start flex-wrap">
                {sendGridTemplate.templates &&
                sendGridTemplate.templates.length ? (
                  sendGridTemplate.templates.map((temp) => (
                    <div
                      key={temp.id}
                      className={
                        selectedTemp === temp.template_id
                          ? "selectedTemp m-2"
                          : "m-2"
                      }
                      onClick={() => selectFunc(temp.template_id)}
                    >
                      <div className="temp-div">
                        <Img
                          src={temp.thumbnail_url}
                          alt="templateurl"
                          width="180px"
                          loader={
                            <div
                              className="page-loader d-flex justify-content-center"
                              style={{ minHeight: "180px", minWidth: "180px" }}
                            >
                              <CircularProgress style={{ margin: "auto" }} />
                            </div>
                          }
                        />
                        <div className="temp-name">
                          <span>{temp.name}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <h2>Template List Empty!</h2>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TemplateList;
