import React from 'react'
import image from './logo.jpg'
import building1 from './building1.jpg'
import google from './google.webp'
import {Row, Col, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import { useState } from 'react'
import { useAuth } from '../../Authentication/useAuth'
import axios from 'axios'

const LoginPage = () => {
  console.log("Login Called")
  // const {login} = useAuth();
  const [userLoginData, setUserLoginData] = useState({
    email:"",
    password:""
  })
  const [invalidCredentials, setInvalidCredentials] = useState("")

  function handleChange(e){
    const {name, value} = e.target;
    setUserLoginData({
      ...userLoginData,
      [name]: value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(userLoginData)
    // const response = axios.post("http://localhost:3002/api/client/login",{
    //   "email": userLoginData.email,
    //   "password": userLoginData.password
    // }).then((response)=>{
    //   console.log(response)
    // }).catch((err)=>{
    //   console.log("Http request Error:", err)
    //   alert(err.message)
    // })
    // login(userLoginData.email, userLoginData.password);
   
  }

  return (
  <>
  <Row style={{overflow:"hidden", marginTop:"4%"}}>
    <Col xs='6' className=''>
     <img className='w-100' src={building1} alt="" />
    </Col>
    <Col xs='6' className='px-5 pt-2'>

      <center>
        <img className='mt-2' src={image} width="30%" alt="" />
        <h4 className='mt-3'>Welcome User!</h4>
        <p className='p-3'>
          This is the only page you are going to see
          Some quick example text to build on the card
          title and make up the bulk of the card‘s content.
        </p>
      </center>
      
      <Form className='mt-3' onSubmit={(e)=>handleSubmit(e)}>
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
              value={userLoginData.email}
              onChange={(e)=>handleChange(e)}
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
              value={userLoginData.password}
              onChange={(e)=>handleChange(e)}
            />
          </FormGroup>
          {' '}
          <Button color='secondary' className='w-100' type='submit'>
            Submit
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

export default LoginPage