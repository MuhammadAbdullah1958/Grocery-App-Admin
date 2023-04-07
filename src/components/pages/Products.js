import React from 'react';
import alchemist from "./Assets/alchemist.jpg"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Domain from 'lib/Config';
import image from "./Assets/alchemist.jpg"
// import adminReducer from 'store/reducers/admin.reducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAdminProducts, deleteProduct, adminProductDetail, adminProductUpdate, getSearchProducts } from 'store/actions';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {Container, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Col, Input, Spinner} from 'reactstrap';
import {TablePagination, Paper, TableContainer, TableBody, TableHead, Table,TableRow, TableCell } from '@material-ui/core';
import { FaEye } from 'react-icons/fa';
import { IoTrashBinOutline } from 'react-icons/io5';
import Pagination from './Pagination';
import { FcSearch } from 'react-icons/fc';
import queryString, { parse } from 'query-string';
import history from '@history';
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

const Products = () => {
  let page = parsed?.page ? parsed?.page : 0;
  const [filter, setFilter] = useState(0);  
  const location = useLocation();
  // console.log("filter:", filter)

  var parsed = queryString.parse(location.search);
  // console.log("parsed:", parsed)

  const [variables, setVariables] = useState({
    filter: filter || 0,
    page: page || 0,
    // ...parsed
  });
  // console.log("variables:", variables)

  useEffect(()=>{
    setVariables({
      ...variables,
      filter: filter || 0
    })
  }, [filter])

  const response = useSelector((state)=> state);
  console.log("Response:", response)

  const products = response?.admin?.AdminProducts?.rows;
  // console.log("Products :", products)

  const productsLoader = response?.admin?.AdminProducts?.Loading;
  console.log("products loader:", productsLoader);

  const productDetail = response?.admin?.AdminProdDetail?.details;
  // console.log("Product Detail:", productDetail)

  const totalProducts = response?.admin?.AdminProducts?.totalProducts;
  // console.log("Total Products:", totalProducts)

  const searchProduct = response?.admin?.AdminSearchProduct?.product;
  // console.log("search product:", searchProduct)

  // State for Update Product
  const [productDetails, setProductDetails] = useState({
    id: productDetail?.id || "",
    title: productDetail?.title || "",
    price: productDetail?.price || "",
    discount: productDetail?.discount || "",
    description: productDetail?.description || "",
    quantity: productDetail?.quantity || "",
    categoryId: productDetail?.categoryId || "",
    productImage: productDetail?.productimages?.url || "",
  })

  // console.log("Product Details:", productDetails);

  // pagination

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(10);

  // indices of page
  const indexOfLastRecord = parsed?.page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const paginatedProducts = products;
  const nPages = Math.ceil(totalProducts / recordsPerPage)
  const pageNumbers = [...Array(nPages + 1).keys()]?.slice(1)
  // console.log("page Numbers:", pageNumbers, nPages)

  const nextPage = () => {
    // console.log("parsed.page: +", nPages, page);
    if( parsed?.page < nPages-1 ){
      // parsed.page = parsed.page + 1;
          setVariables({
          ...variables,
          page: parseInt(variables.page) + 1
        })
      }
    }

  const prevPage = () => {
    // console.log("parsed.page: -",nPages, page);
        if( parsed?.page > 0){
        setVariables({
          ...variables,
          page: parseInt(variables.page) - 1
        })
      }
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
    dispatch(getAdminProducts(variables));
  }, [variables])

  // redirect
  const history = useHistory();
  const dispatch = useDispatch();
  const formData = new FormData();

  // Add Picture to the FormData
  function handlePicture(e){
    formData.append("uploaded_file",  e.target.files[0])
    // console.log( formData.get("uploaded_file"))
  }

  // Delete Product
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  }

  const handleUpdate = (id) => {
    history.push(`productDetail/${id}`)
    // console.log("ID:", id)
    // dispatch(adminProductDetail(id))
  }

  // Submit Updated Product Details
  const handleUpdateForm = (e) =>{
    // console.log("Products Usestate:", productDetails)
    e.preventDefault();

          // Populate Form Data
          formData.append("title", productDetails.title)
          formData.append("price", productDetails.price)
          formData.append("description", productDetails.description)
          formData.append("categoryId", productDetails.categoryId)
          formData.append("quantity", productDetails.quantity)
          formData.append("discount", productDetails.discount)
          formData.append("discount", productDetails.discount)

           const productImg = formData.get("uploaded_file")
          //  console.log("Image:", productImg);
           if(productImg===null){
            formData.append("uploaded_file", productDetail?.productimages?.url)
           }

          dispatch(adminProductUpdate(formData));

          setInterval(()=>{
             toggle();
          }, 400)
  }

  // Modal open state
  const [modal, setModal] = React.useState(false);
  
  // Toggle for Modal
  const toggle = () => setModal(!modal);
  
  const handleRedirect = (id) => {

    history.push(`view-customer/${id}`)

  }

  const handlePaginationPage = (pageNumber) => {
    // console.log("page number:", pageNumber)
      setVariables({
        ...variables,
        page: pageNumber-1
      })
  }

  return (
    <>
      <Container fluid >
        <div className="">
          <h5 className='mx-2'>Products List</h5>         
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
                        // type="number"
                        style={{width:"100%", border:0, height:"30px", marginTop:"2%", marginBottom:"3%", borderRadius:"6px", boxShadow:"1px 1px 1px 1px gray"}}
                        onChange={(e)=>setFilter(e.target.value)}
                        />
                </span>
                </Col>
              
              <Col lg={4}></Col>

              <Col lg={2}>
                <Button className="mx-2 mt-2" style={{height:"30px"}} outline size="small" color="danger" onClick={()=>history.push("addproducts")}>
                  Add Product
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
                         Price
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                        Discount
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
                         Category
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Quantity
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{minWidth:"150px", fontSize:"12px", fontWeight:"600"}}
                        >
                         Product Image
                        </TableCell>

                        <TableCell
                          key="1"
                          align="left"
                          style={{fontSize:"12px", fontWeight:"600"}}
                        >
                         Details
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
                      productsLoader===true
                      ?
                      "Loading..."
                      : 
                      paginatedProducts?.length ===0 ? 
                      <h4 className='m-3'>No Products Found</h4>
                      :
                      paginatedProducts?.map((product, index)=>{
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
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {product?.price || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {product?.discount || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{minWidth:"100px", maxWidth:"150px", fontSize:"12px", fontWeight:"400",
                          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipses", width:"100%"}}
                          >
                          {product?.description || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {product?.categoryId || "Not Found" }
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          >
                          {product?.quantity}
                          </TableCell>

                          <TableCell align="left"
                          style={{minWidth:"150px", fontSize:"12px", fontWeight:"400"}}
                          >
                            <img src={product?.productimages[0]?.url} style={{width:"50%", objectFit:"contain"}} alt="Not found" />
                          
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          onClick={()=>{ toggle() ; handleUpdate(product.id)}}
                          >
                          <FaEye color="blue" size="12px" style={{cursor:"pointer"}} />
                         
                          </TableCell>

                          <TableCell align="left"
                          style={{fontSize:"12px", fontWeight:"400"}}
                          onClick={()=>handleDelete(product.id)}
                          >
                          <IoTrashBinOutline color="red" size="12px" style={{cursor:"pointer"}} />
                         
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
       </Container>

      {/* Modal For Update */}
          {/* <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader
                toggle={toggle}>
                  <h3>Update Product ID : {productDetails?.id}</h3>
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
                  value={productDetails?.title}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="price"
                sm={2}
              >
                Price
              </Label>
              <Col sm={10}>
                <Input
                  id="price"
                  name="price"
                  placeholder=""
                  type="text"
                  value={productDetails.price}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="discount"
                sm={2}
              >
                Discount
              </Label>
              <Col sm={10}>
                <Input
                  id="discount"
                  name="discount"
                  placeholder=""
                  type="text"
                  value={productDetails.discount}
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
                  value={productDetails.description}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="categoryId"
                sm={2}
              >
                Category Id
              </Label>
              <Col sm={10}>
                <Input
                  id="categoryId"
                  name="categoryId"
                  placeholder=""
                  type="text"
                  value={productDetails.categoryId}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="selectImage"
                sm={2}
              >
                Product Image
              </Label>
              <Col sm={11}>
              <img src={productDetail?.productimages?.url} style={{width:"100%", objectFit:"contain"}} alt="Not found" />
                <Input
                  id="picture"
                  name="picture"
                  placeholder=""
                  type="file"
                  onChange={(e)=>handlePicture(e)}
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

              <Button
                  className="px-4 mx-4 w-25"
                  color="secondary"
                  size="md"
                  // onClick={(e)=>handleClearForm(e)}
                  onChange={(e)=>handleChangeForm(e)}
                  >
                  Clear
              </Button>
            </FormGroup>
                </Form>
              </ModalBody>

              <ModalFooter>
                <Button color="primary" onClick={toggle}>Okay</Button>
              </ModalFooter>
          </Modal> */}
    </>
  )
}

export default Products