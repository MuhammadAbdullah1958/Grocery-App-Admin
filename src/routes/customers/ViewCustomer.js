import React from 'react'
import { Container } from 'reactstrap'
import { IoIosArrowBack } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerDetailAdmin } from 'store/actions';

const ViewCustomer = () => {

  const dispatch = useDispatch();
  const { id } = useParams()

  console.log("ID:", id)

  useEffect(()=>{
    dispatch(customerDetailAdmin(id))
  }, [])

  const response = useSelector((state)=> state);
  console.log("Response:", response)

  const customerDetails = response?.customers?.customerList;
  console.log("Customer Details:", customerDetails)

  return (
    <>
       <Container>
           <IoIosArrowBack size={20} style={{cursor:"pointer"}} onClick={()=> window.history.back()} />
       </Container>
    </>
  )
}

export default ViewCustomer