import React, { useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { useState } from 'react';
import { Container, Row, Col, Button, Input} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetCustomers } from 'store/actions';
import { FaEye } from 'react-icons/fa';
import { redirect } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Pagination from "../../components/pages/Pagination";
import { DebounceInput } from 'react-debounce-input'
import { useLocation } from 'react-router-dom';
import queryString, { parse } from 'query-string';

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

const CustomersList = () => {

  let page = parsed?.page ? parsed?.page : 0;
  const [filter, setFilter] = useState(0);  
  const location = useLocation();
  console.log("filter:", filter)

  var parsed = queryString.parse(location.search);
  console.log("parsed:", parsed)

  const [variables, setVariables] = useState({
    filter: "",
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

  const history = useHistory();
  //modal 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const response = useSelector((state)=> state);
  console.log("Response:", response)

  const customersList = response?.customers?.customerList;
  console.log("Customers List:", customersList)

  const totalCustomers = response?.customers?.totalCustomers;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleRedirect = (id) => {

    history.push(`view-customer/${id}`)

  }

  // pagination

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(10);

  // indices of page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const paginatedClients = customersList;
  const nPages = Math.ceil(totalCustomers / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()]?.slice(1)
  
  console.log("Paginated clients:", paginatedClients)
  console.log("nPages", nPages)

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
    dispatch(adminGetCustomers(variables))
  }, [variables])


  return (
    <>
       <Container fluid >
        <h5>Customers List</h5>
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
              
              <Col lg={4}></Col>
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
                        Name
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Email
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
                        Created At
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Status
                        </TableCell>

                         {/* <TableCell
                          key="1"
                          align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Details
                        </TableCell> */}
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      paginatedClients?.length ===0 ? 
                      <h4>No Customers Found</h4>
                      :
                      paginatedClients?.map((customer, index)=>{
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
                          {customer?.name || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.email || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.phone || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          {customer?.createdAt || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          >
                          <Button outline color="secondary px-2 py-1" style={{fontSize:"10px"}}> {customer?.status || "Not Found" }</Button>{' '}
                         
                          </TableCell>

                          {/* <TableCell align="left"
                          style={{ minWidth: "100px", fontSize:"12px", fontWeight:"400"}}
                          onClick={() => handleRedirect(customer?.id)}
                          >
                          <FaEye color="blue" style={{cursor:"pointer"}} />
                         
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
                               onClick={()=>handlePaginationPage(pgNumber)}>
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
       </Container>
    </>
  )
}

export default CustomersList