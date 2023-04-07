import React from 'react';
import alchemist from "./Assets/alchemist.jpg"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Domain from 'lib/Config';
import image from "./Assets/alchemist.jpg"
// import adminReducer from 'store/reducers/admin.reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAdminCategories, deleteCategory, adminCategoryDetail, adminCategoryUpdate, getSearchProducts } from 'store/actions';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {Container, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Col, Input} from 'reactstrap';
import {TablePagination, Paper, TableContainer, TableBody, TableHead, Table,TableRow, TableCell } from '@material-ui/core';
import { RxPencil2 } from 'react-icons/rx';
import { IoTrashBinOutline } from 'react-icons/io5';
import Pagination from './Pagination';
import { FcSearch } from 'react-icons/fc';
import queryString, { parse } from 'query-string';
import history from '@history';
import { useLocation } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input'

const Categories = () => {
  let page = parsed?.page ? parsed?.page : 0;
  const [filter, setFilter] = useState();
  console.log("filyter:", filter)
  const location = useLocation();
 

  var parsed = queryString.parse(location.search);
  console.log("parsed:", parsed)

  const [variables, setVariables] = useState({
    filter: filter,
    page: page,
    // ...parsed
  });
  console.log("variables:", variables)

  useEffect(()=>{
    console.log("variables:", variables)
    setVariables({
      ...variables,
      filter: filter || 0
    })
  }, [filter])

  const response = useSelector((state)=> state);
  console.log("Response:", response)

  const categories = response?.admin?.AdminCategories?.categories?.rows;
  console.log("categories :", categories)

  const singleCategories = response?.admin?.AdminCategoryDetail?.details;
  console.log("single Categories:", singleCategories)

  const totalCategories = response?.admin?.AdminCategories?.totalCategories;
  console.log("Total Products:", totalCategories)

  const searchProduct = response?.admin?.AdminSearchProduct?.product;
  // console.log("search product:", searchProduct)

  // State for Update Product
  const [categoryDetail, setCategoryDetail] = useState({
    title: "",
    description: "",
  })

  const handleChangeForm = (e) => {
    const {name, value, type} = e.target;

    setCategoryDetail({
      ...categoryDetail,
      [name]: value
    })
  }

  useEffect(()=>{
    setCategoryDetail({
        title: singleCategories?.title,
        description: singleCategories?.description,
    })
  }, [singleCategories])

  // console.log("Product Details:", productDetails);

  // pagination

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(10);

  // indices of page
  const indexOfLastRecord = parsed?.page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const paginatedCategories = categories;
  const nPages = Math.ceil(totalCategories / recordsPerPage)
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


   // Get All products
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
    dispatch(getAdminCategories(variables));
  }, [variables])

  // redirect
  const history = useHistory();
  const dispatch = useDispatch();
  const formData = new FormData();

  // Delete Product
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  }

  const handleProductDetail = (id) => {
    dispatch(adminCategoryDetail(id))
  }

  // Submit Updated Product Details
  const handleUpdateForm = (e) =>{
    // console.log("Products Usestate:", productDetails)
    e.preventDefault();

          // Populate Form Data
          formData.append("title", categoryDetail?.title)
          formData.append("description", categoryDetail?.description)
          formData.append("id", singleCategories?.id)

          dispatch(adminCategoryUpdate(formData));

          setInterval(()=>{
             toggle();
          }, 400)
  }

  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <>
      <Container fluid >
        <div className="">
          <h5 className='mx-2'>Categories List</h5>    
        </div>
        
        <Row className="my-2 mx-1 py-2" style={{boxShadow:"1px 1px 3px gray", borderRadius:"12px"}}>
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
                </span>
                </Col>
              
              <Col lg={4}></Col>

              <Col lg={2}>
                <Button className="mx-2 mt-2" style={{height:"30px"}} outline size="small" color="danger" onClick={()=>history.push("addCategories")}>
                  Add Categories
                </Button>
              </Col>
            </Row>
          </Col>
       
          <Col lg={12} >
            <Paper sx={{ overflow: 'hidden'}}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      
                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Id
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                        Name
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Description
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Created At
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Update
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Delete
                        </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      paginatedCategories?.length ===0 ? 
                      <h4 className='m-3'>No Products Found</h4>
                      :
                      paginatedCategories?.map((product, index)=>{
                       return <TableRow key={index}>
                          {/* <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {index+1}
                          </TableCell> */}

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {product?.id || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {product?.title || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{minWidth:"100px", fontSize:"12px", fontWeight:"400",
                        //   whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipses", width:"100%"
                        }}
                          >
                          {product?.description || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{minWidth:"100px", fontSize:"12px", fontWeight:"400",
                        //   whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipses", width:"100%"
                        }}
                          >
                          {product?.createdAt || "Not Found" }
                          </TableCell>


                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          onClick={()=>{ toggle() ; handleProductDetail(product.id)}}
                          >
                          <RxPencil2 color="blue" size="12px" style={{cursor:"pointer"}} />
                          
                         
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          <IoTrashBinOutline color="red" size="12px" style={{cursor:"pointer"}} onClick={()=>handleDelete(product.id)} />
                         
                          </TableCell>
                    
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

      {/* Modal For Update */}
          <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader
                toggle={toggle}
                >
                  <h3>Update Product ID : {singleCategories?.id}</h3>
              </ModalHeader>

              <ModalBody>
            <Form onSubmit={(e)=>handleUpdateForm(e)}>
  

            <FormGroup row>
              <Label
                for="title"
                sm={2}
              >
                Title
              </Label>
              <Col sm={10}>
                <Input
                  id="title"
                  name="title"
                  placeholder=""
                  type="text"
                  value={categoryDetail?.title}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="description"
                sm={2}
              >
                Description
              </Label>
              <Col sm={10}>
                <Input
                  id="description"
                  name="description"
                  placeholder=""
                  type="text"
                  value={categoryDetail?.description}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Button
                  className="px-4 w-25"
                  color="primary"
                  size="md"
                  type="submit"
                  >
                  Update
              </Button>

              {/* <Button
                  className="px-4 mx-4 w-25"
                  color="secondary"
                  size="md"
                  // onClick={(e)=>handleClearForm(e)}
                  onChange={(e)=>handleChangeForm(e)}
                  >
                  Clear
              </Button> */}
            </FormGroup>
                </Form>
              </ModalBody>
          </Modal>
    </>
  )
}

export default Categories