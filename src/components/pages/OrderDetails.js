import React from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader,CardTitle, CardBody, CardText} from 'reactstrap';
import { IoIosArrowBack } from 'react-icons/io';
import { orderDetailAdmin } from 'store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams()

    useEffect(()=>{
        dispatch(orderDetailAdmin(id))
    }, [])

    const response = useSelector((state)=> state);
    console.log("All Response:", response)

    const orderDetails = useSelector((state)=> state?.admin?.OrderDetails?.details);
    console.log("Order Details Response:", orderDetails)

    const orderProducts = orderDetails?.productOrder;
    console.log("Order products:", orderProducts)

    // read more / less
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    // Modal open state
   const [modal, setModal] = React.useState(false);
   const toggle = () => {
    setModal(!modal);
   }

  return (
    <>
       <Container>
           <IoIosArrowBack size={20} style={{cursor:"pointer"}} onClick={()=> window.history.back()} />
           <Row className="my-3">
            <Col lg={4} className="mx-2 rounded pt-3" style={{backgroundColor:"#EEEEEE", boxShadow:"1px 1px 2px gray"}}>
                {/* <p className='text-gray' style={{fontSize:"12px", textDecoration:"underline"}}>Client Details</p> */}
                <span className='d-flex'> <p style={{fontWeight:"600", fontSize:"12px"}}>Cient Name</p> <p className='mx-3' style={{fontSize:"12px"}}>{orderDetails?.client?.name}</p> </span> 
                <span className='d-flex'> <p style={{fontWeight:"600", fontSize:"12px"}}>Email</p> <p className='mx-3' style={{
                    fontSize:"12px", 
                    wordBreak: "break-all",
                    whiteSpace: "normal",
                }}>{orderDetails?.client?.email}</p> </span> 
                <span className='d-flex'> <p style={{fontWeight:"600", fontSize:"12px"}}>Phone</p> <p className='mx-3' style={{fontSize:"12px"}}>{orderDetails?.client?.phone}</p> </span> 
            </Col>

            <Col lg={5} className="mx-2 rounded pt-2" style={{backgroundColor:"#EEEEEE", boxShadow:"1px 1px 2px gray"}}>
                {/* <p className='text-gray' style={{fontSize:"12px", textDecoration:"underline"}}>Purchasing Details</p> */}

                <Row className="">
                    <Col lg={5}>
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>Client Id</p> 
                                <p className='mx-3' style={{fontSize:"12px"}}>{orderDetails?.clientId}</p>
                                </span>
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>Amount</p> 
                                <p className='mx-3' style={{fontSize:"12px" }}>{orderDetails?.amount}</p>
                                </span> 
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>Delievery Charges</p> 
                                {/* <p className='mx-3' style={{fontSize:"12px" }}>{orderDetails?.deliveryCharge}</p> */}
                                <p className='mx-3' style={{fontSize:"12px" }}> 230 </p>
                                </span> 
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>Different Phone</p> 
                                {/* <p className='mx-3' style={{fontSize:"12px" }}>{orderDetails?.deliveryCharge}</p> */}
                                <p className='mx-3' style={{fontSize:"12px" }}> {orderDetails?.phone} </p>
                                </span> 
                    </Col>

                    <Col lg={7}>
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>Address</p> 
                                <p className='mx-3' style={{fontSize:"12px"}}>{orderDetails?.address}</p>
                                </span>
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>City</p> 
                                <p className='mx-3' style={{fontSize:"12px" }}>{orderDetails?.city}</p>
                                </span> 
                                <span className='d-flex'> 
                                <p style={{fontWeight:"600", fontSize:"12px"}}>Status</p> 
                                <p className='mx-3' style={{fontSize:"12px" }}>{orderDetails?.status}</p>
                                </span> 
                    </Col>
                </Row>
             

               
               
            </Col>
           </Row>
           
           <Row className="mt-4">
                <Col lg={10}>
                <span className='d-flex'> 
                    <p style={{fontWeight:"600", fontSize:"12px"}}>Ordered Products</p> 
                    <p className='mx-3' style={{fontSize:"12px" }}>{orderProducts?.length}</p>
                </span> 
                </Col>
           </Row>

           <Row className="">
            <Col lg={10} className="mx-2">
                <Row >
                    {
                        orderProducts?.length === 0 ? 
                        <h6>No Products to Show</h6>
                        : 
                        orderProducts?.map((product, index)=>{
                           return <Col className="product-card mx-1" lg={3} key={index} style={{cursor:"pointer", boxShadow:"1px 1px 2px gray"}}>
                               <div>
                                <div className="img">
                                    <img src={product?.product?.productImages[0]?.url} style={{objectFit:"contain", width:"100%", height:"140px"}} alt="" />
                                    <p className='mt-2' style={{color:"black", textAlign:"center", fontSize:"12px", lineHeight:"5px", fontWeight:"600"}}> <b> Title: </b> {product?.product?.title}</p>
                                    <p style={{color:"black", textAlign:"center", fontSize:"12px", lineHeight:"15px", whiteSpace: "normal", textAlign: "justify", textJustify: "inter-word"}}> <b> Description: </b>
                                     {isReadMore ? product?.product?.description?.slice(0, 10) : product?.product?.description}
                                     <span onClick={toggleReadMore} style={{cursor:"pointer", color:"blue"}} className="read-or-hide">
                                     {isReadMore ? "...read more" : " show less"}
                                     </span>
                                    </p>
                                    <p style={{color:"black", textAlign:"center", fontSize:"12px", lineHeight:"5px", whiteSpace: "normal"}}> <b> Quantity: </b> {product?.quantity}</p>
                                </div>
                               </div>
                             </Col>
                        })
                    }
               
                </Row>
            </Col>
           </Row>
       </Container>
    </>
  )
}

export default OrderDetails