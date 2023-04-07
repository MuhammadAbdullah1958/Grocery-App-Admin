import React from 'react'
import image from './logo.jpg'
import building1 from './building1.jpg'
import google from './google.webp'
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'

const SignupPage = () => {

  return (
  <>
  <Row style={{overflow:"hidden", marginTop:"4%"}}>
    <Col xs='6' className=''>
     <img className='w-100' src={building1} alt="" />
    </Col>
    <Col xs='6' className='px-5 pt-2'>

      <center>
        <img className='mt-2' src={image} width="30%" alt="" />
        <h4 className='mt-4'>Signup</h4>
      </center>

      <Form className='mt-3'>
      <FormGroup>
            <Label
              for="username"
              hidden
            >
              Username
            </Label>
            <Input
              id="username"
              name="usnename"
              placeholder="Username"
              type="text"
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label
              for="exampleEmail"
              hidden
            >
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label
              for="examplePassword"
              hidden
            >
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label
              for="confirmPassword"
              hidden
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
          </FormGroup>
          {' '}
          <Button color='secondary' className='w-100'>
            Register
          </Button>
      </Form>
      <div style={{
        cursor:"pointer"
      }} className="rounded d-flex justify-content-center mt-4 border border-2 border-primary">
        <img src={google} style={{width:"8%"}} alt="" />
        <h6 className='mt-2'>Sign In with Google</h6>
      </div>
    </Col>
  </Row>
  </>
  )
}

export default SignupPage