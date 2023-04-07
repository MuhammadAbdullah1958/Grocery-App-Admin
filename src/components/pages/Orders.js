import React from 'react'
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOrdersAdmin, orderDetailAdmin, adminUpdateOrder } from 'store/actions';
import { Modal, ModalFooter, ModalHeader, ModalBody, Container, Row, Col, Input } from "reactstrap"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import {HiOutlinePencilSquare} from 'react-icons/hi2'
import {IoTrashBinOutline} from 'react-icons/io5'
import Pagination from './Pagination';
import queryString, { parse } from 'query-string';
import { useLocation } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const Orders = () => {

  const response = useSelector((state)=> state);
    console.log("All Response:", response)

    const clientOrders = useSelector((state)=> state?.admin?.Orders?.rows);
    console.log("Order Details Response:", clientOrders)
    

  let page = parsed?.page ? parsed?.page : 0;
  const [filter, setFilter] = useState(0);  
  const location = useLocation();
  console.log("filter:", filter)

  var parsed = queryString.parse(location.search);
  console.log("parsed:", parsed)

  const [variables, setVariables] = useState({
    filter: filter,
    page: page,
    // ...parsed
  });
  console.log("variables:", variables)

  useEffect(()=>{
    setVariables({
      ...variables,
      filter: filter || 0
    })
  }, [filter])


  const totalOrders = response?.admin?.Orders?.totalOrders;

  const history = useHistory();
  // console.log("Header of axios:", axios.defaults.headers.common['Authorization'])
    // Modal open state
    const [modal, setModal] = React.useState(false);

    const [ statusDetails, setStatusDetails] = useState({
      id: 0,
      status: "",
    });
  
    // Toggle for Modal
    const toggle = () => {
      // setStatusId(id);
        setModal(!modal)
        // handleSingleDetail(id);
    }

    //set order
    const handleConfirmOrder = (e) => {
      const value = e.target.value;
      setStatusDetails({
        ...statusDetails,
        status: value
      })
    }

    const handleSubmitOrder = () => {
      console.log("status:", statusDetails)
      dispatch(adminUpdateOrder(statusDetails))
    }

    const handleSingleDetail = (id) => {
        dispatch(orderDetailAdmin(id));
    }

    const dispatch = useDispatch();


   // Get All Orders
   useEffect(()=>{
    const newUrl = queryString.stringify(variables);
    history.push({search: newUrl})

    const {filter, page} = variables;
    if(variables?.filter !== 0){
      // setVariables({
      //   ...variables,
      //   page: 0
      // })
    }
    dispatch(getOrdersAdmin(variables));
  }, [variables])

    // useEffect(()=>{
    //     dispatch(getOrdersAdmin());
    // }, [])

    const handleRedirect = (id) => {
      history.push(`order-details/${id}`)
    }

  // pagination

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(10);

  // indices of page
  const indexOfLastRecord = parsed?.page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const paginatedOrders = clientOrders;
  const nPages = Math.ceil(totalOrders / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()]?.slice(1)
  console.log("page Numbers:", pageNumbers, nPages)

  const nextPage = () => {
    console.log("parsed.page: +", nPages, page);
    if( parsed?.page < nPages-1 ){
      // parsed.page = parsed.page + 1;
          setVariables({
          ...variables,
          page: parseInt(variables.page) + 1
        })
      }
    }

  const prevPage = () => {
    console.log("parsed.page: -",nPages, page);
        if( parsed?.page > 0){
        setVariables({
          ...variables,
          page: parseInt(variables.page) - 1
        })
      }
    }

    const handlePaginationPage = (pageNumber) => {
      console.log("page number:", pageNumber)
        setVariables({
          ...variables,
          page: pageNumber-1
        })
    }

  return (
    <>
    <Container fluid >
        <h5>Customers Orders</h5>
        <Row className="my-3 mx-1 py-2" style={{boxShadow:"1px 1px 5px gray", borderRadius:"12px"}}>

        <Col lg={12}>
            <Row>
                <Col lg={6}>
                <span className='d-flex'>
                <DebounceInput
                        minLength={2}
                        className="search px-3"
                        placeholder="Search through ID..."
                        debounceTimeout={500}
                        type="number"
                        style={{width:"100%", border:0, height:"30px", marginTop:"2%", marginBottom:"3%", borderRadius:"6px", boxShadow:"1px 1px 1px 1px gray"}}
                        onChange={(e)=>setFilter(e.target.value)}
                   />
                   {/* <FcSearch className='mt-2 mx-3' fontSize={24}/> */}
                </span>
                </Col>
            </Row>
          </Col>

          <Col lg={12} >
            <Paper sx={{ overflow: 'hidden'}}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      
                        {/* <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Sr.
                        </TableCell> */}

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Id
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                        Amount
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Address
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                        Phone
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Date
                        </TableCell>

                         <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Status
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Details
                        </TableCell>

                        {/* <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Update
                        </TableCell> */}

                        {/* <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Delete
                        </TableCell> */}
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      paginatedOrders?.length ===0 ? 
                      <h4>No Customers Found</h4>
                      :
                      paginatedOrders?.map((customer, index)=>{
                       return <TableRow key={index}>
                          {/* <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {index+1}
                          </TableCell> */}

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.id || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.amount || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.address || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.phone || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.date || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          <Button outline color={customer?.status === "pending" ? "secondary" : "success"} style={{fontSize:"10px"}} onClick={()=>{toggle();
                             setStatusDetails({
                              status:"pending",
                              id: customer?.id
                             }
                              )}}> 
                             {customer?.status || "Not Found" }</Button>{' '}
                         
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          onClick={() => handleRedirect(customer?.id)}
                          >
                          <FaEye color="blue" style={{cursor:"pointer"}} />
                         
                          </TableCell>

                          {/* <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"14px", fontWeight:"400"}}
                         
                          >
                          <HiOutlinePencilSquare color="black" style={{cursor:"pointer"}} />
                         
                          </TableCell> */}

                          {/* <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"14px", fontWeight:"400"}}
                         
                          >
                          <IoTrashBinOutline color="red" style={{cursor:"pointer"}} />
                         
                          </TableCell> */}
                    
                        </TableRow>
                      })
                    }                        
                  </TableBody>
                </Table>
              </TableContainer>

              <nav className='mt-5'>
                <ul className='pagination justify-content-center'>
                    <li className='page-item text-dark'>
                        <p onClick={prevPage} className="px-3 py-1 rounded mx-3" style={{color:"white", cursor:"pointer", backgroundColor:"#be2046"}}>
                            Prev
                        </p>
                    </li>
                {
                    pageNumbers?.map(pgNumber => (
                        <li key={pgNumber} >
                            <p className={`page-item mx-1 px-3 py-1 ${parsed?.page == pgNumber-1 ? 'active' : ''} `} 
                               style={{cursor: "pointer", boxShadow:"1px 1px 2px gray"}}
                               onClick={()=>handlePaginationPage(pgNumber)} >
                                {pgNumber}
                            </p>
                                
                        </li>
                    ))
                }

                <li className='page-item'>
                    <p onClick={nextPage} className="px-3 py-1 rounded mx-3" style={{color:"white", cursor:"pointer", backgroundColor:"#be2046"}}>
                        Next
                    </p>
                </li>
                </ul>
              </nav>

            </Paper>
          </Col>
        </Row>

          {/* Modal */}
           <Modal isOpen={modal} toggle={toggle} style={{height:"80vh"}}>
                <ModalHeader
                    toggle={toggle}>Order Status: {statusDetails?.id}</ModalHeader>
                <ModalBody>
                <select className=''
                        id="categoryId" name="categoryId"
                        onChange={(e)=>handleConfirmOrder(e)}
                        style={{height:"30px", width:"100%", padding:"", fontSize:"14px", boxShadow:"1px 1px 2px gray"}}
                        >
                        <option style={{fontSize:"14px"}} value="pending">Pending</option>
                        <option style={{fontSize:"14px"}} value="confirm">Confirm</option>
                </select>
                
                <Button className="d-flex my-3" color="primary" onClick={(e)=>{handleSubmitOrder()}} style={{fontSize:"12px"}}> Confirm </Button>{' '}
                </ModalBody>
            </Modal>

       </Container>

      {/* <Table>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Id</th>
            <th>Amount</th>
            <th>Delievery Charges</th>
            <th>Note</th>
            <th>Date Order</th>
            <th>Status</th>
            <th>Confirmed</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
            {
                orderSelector?.length===0 ? 
                <h3> No Orders Found</h3>
                :
                orderSelector?.map((order, index)=>{
                  return <tr>
                    <th scope="row">{index+1}</th>
                    <td>{order?.id}</td>
                    <td>{order?.amount}</td>
                    <td>{order?.delieveryCharge ? order?.delieveryCharge : "No charges"}</td>
                    <td>{order?.Note ? order?.Note : "No Note"}</td>
                    <td>{order?.dateOrder}</td>
                    <td>{order?.status}</td>
                    <td>{order?.confirmed ? order?.confirmed : "No"}</td>
                    <td> <Button size="sm" outline color="primary" onClick={()=> toggle(order.id)}>Details</Button> </td>
                  </tr>
                })
            }
        </tbody>
      </Table> */}

      {/* <div style={{
            display: 'block', width: 700, padding: 30
        }}>
          
            <Modal isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 500 }}>
                <ModalBody>
                    Simple Modal with just ModalBody...
                </ModalBody>
            </Modal>
        </div > */}
    </>
  )
}

export default Orders