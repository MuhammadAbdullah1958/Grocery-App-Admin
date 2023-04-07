import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import * as Actions from "store/actions";

const EditCustTemp = (props) => {
  const dispatch = useDispatch();
  const { cust, Loading } = props;
  const [editData, setEditData] = useState({
    fullName: cust.fullName,
    email: cust.email,
    phone: cust.phone,
    city: cust.city,
    address: cust.address,
  });

  const handleCustData = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    editData.id = cust.id;
    dispatch(Actions.CustomerLoading(true));
    dispatch(Actions.customerUpdateAdmin(editData));
  };
  return (
    <div>
      <div className="container">
        <div className="rct-block">
          <div className="rct-block-content rct-full-block">
            {Loading ? (
              <div
                className="page-loader d-flex justify-content-center mb-30"
                style={{ minHeight: "300px" }}
              >
                <CircularProgress style={{ margin: "auto" }} />
              </div>
            ) : (
              <Form onSubmit={(e) => onEditSubmit(e)} className="p-3">
                <div className="d-flex justify-content-end mb-2 mr-2">
                  <h4>
                    User Status:{" "}
                    {cust.status ? (
                      <span style={{ color: "#45db35" }}>Active</span>
                    ) : (
                      <span style={{ color: "#FF3739" }}>Banned</span>
                    )}
                  </h4>
                </div>
                <Row form>
                  <Col md={4} sm={6}>
                    <FormGroup>
                      <Label for="fullName">First Name</Label>
                      <Input
                        type="text"
                        name="fullName"
                        id="fullName"
                        defaultValue={cust.fullName}
                        onChange={(e) => handleCustData(e)}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} sm={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={cust.email}
                        onChange={(e) => handleCustData(e)}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4} sm={6}>
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
                        type="number"
                        name="phone"
                        id="phone"
                        defaultValue={cust.phone}
                        onChange={(e) => handleCustData(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} sm={6}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={cust.city}
                        onChange={(e) => handleCustData(e)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} sm={6}>
                    <FormGroup>
                      <Label for="status">User Status</Label>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        onChange={(e) => handleCustData(e)}
                      >
                        <option value="">select</option>
                        <option value={0}>Banned</option>
                        <option value={1}>Active</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    type="textarea"
                    name="address"
                    id="address"
                    defaultValue={cust.address}
                    onChange={(e) => handleCustData(e)}
                  />
                </FormGroup>
                <Button color="primary" type="submit" className="mr-2">
                  Update
                </Button>
                <Button color="danger" onClick={props.history.goBack}>
                  Cancel
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustTemp;
