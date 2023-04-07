import { Description } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useState } from 'react'
import axios from 'axios'
import Domain from 'lib/Config'
import { addNewProduct, getAdminCategories} from 'store/actions'
import { Form, FormGroup, FormText, Label,Row, Col, Input, Button  } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from 'react-router'
import { IoIosArrowBack } from 'react-icons/io';
import { RiAddCircleLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom'

const AddProducts = () => {
  const history = useHistory();
  useEffect(()=>{
    dispatch(getAdminCategories())
  }, [])

  const response = useSelector((state)=> state);
  console.log("response:", response)

  const categories = response?.admin?.AdminCategories?.categories?.rows;
    console.log("Categories:", categories)

    const formData = new FormData();
    const dispatch = useDispatch();
    
  //   const mutation = useMutation(newProductDetail => {
  //   const response = axios.post(`${Domain}/api/product/add`, newProductDetail)
  //   console.log("new product details:", newProductDetail)
  //   console.log("Response:", response)
  //   return response;
  // })

  const [productDetails, setProductDetails] = useState({
    id:"",
    title:"",
    price:"",
    discount:"",
    description:"",
    quantity:"",
    categoryId:"",
  })

  const handleChangeForm = (e) => {
    const {name, value, type} = e.target;

    setProductDetails({
      ...productDetails,
      [name]: value
    })
  }

    const handleSubmitForm = (e) =>{
      e.preventDefault();
      console.log("Product DEtails:", productDetails)

      if(productDetails.discount>60 || productDetails.discount===0){
        alert("Discount must be less than 60")
      }
      else if(productDetails.categoryId==='' || productDetails.categoryId===0 || productDetails.categoryId===null ){
        alert("Please select a category")
      }
      else{
            // Populate Form Data
            formData.append("title", productDetails.title)
            formData.append("price", productDetails.price)
            formData.append("description", productDetails.description)
            formData.append("categoryId", productDetails.categoryId)
            formData.append("quantity", productDetails.quantity)
            formData.append("discount", productDetails.discount)
            dispatch(addNewProduct(formData));

            setTimeout(()=>{
              history.push("products")
            }, 1000)
      }

    // const {id, title, price, discount, description, quantity, categoryId} = productDetails;
    // mutation.mutate({title, pictureDetails, price, description, categoryId, quantity, discount })
  }

  const handleClearForm = () =>{
    setProductDetails({
      id:"",
      title:"",
      price:"",
      discount:"",
      decription:"",
      unitQuantity:"",
      categoryId:""
    })
  }

  function handlePicture(e){

    if (e.target.type === "file") {
      for (let i = 0; i < e.target.files.length; i++) {
        e.target.files[i].url = URL.createObjectURL(e.target.files[i]);
      }
    }
    console.log("files", e.target.files)

    for (const image of e.target.files) {
      // console.log("Image:", image)
    }
    const file = Array.from(e.target.files);
    // console.log("file:", file)

    for (let index = 0; index < file.length; index++) {
      formData.append("uploaded_file", file[index]);
    }

    console.log("images:", formData.getAll("uploaded_file"))
  }

  return (
    <>
      <IoIosArrowBack size={20} style={{cursor:"pointer"}} onClick={()=> window.history.back()} />

      <Row className="my-3 mx-1 py-2 w-75 mx-auto" style={{boxShadow:"1px 1px 3px gray", borderRadius:"12px" , backgroundColor:"white"}}>
        <div className='m-3 d-flex'>
          <RiAddCircleLine size={24}/> <h4 className='mx-2 mt-1'> Add Product </h4>
        </div>
        <Col lg={12}>
          <div className='container-fluid' style={{padding:"2%", boxShadow:"0px 0px 2px gray", backgroundColor:"#FAFAFA"}}>
          <Form onSubmit={(e)=>handleSubmitForm(e)}>
            {/* <FormGroup row>
              <Label
                for="Id"
                sm={2}
              >
                Id
              </Label>
              <Col sm={10}>
                <Input
                  id="id"
                  name="id"
                  placeholder="_ _ _"
                  type="number"
                  value={productDetails.id}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup> */}

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
                  placeholder="Enter title"
                  type="text"
                  value={productDetails.title}
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
                  placeholder="Enter Price"
                  type="number"
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
                  placeholder="Enter discount"
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
                  placeholder="Enter description"
                  type="text"
                  value={productDetails.description}
                  onChange={(e)=>handleChangeForm(e)}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="quantity"
                sm={2}
              >
                Quantity
              </Label>
              <Col sm={10}>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  type="text"
                  value={productDetails.quantity}
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
                <Input type="select" name="categoryId" id="categoryId" placeholder="Enter category id"
                  onChange={(e)=>handleChangeForm(e)} required>
                    {
                      categories?.length !==0 && categories?.map((cat, index)=>{
                        return   <option value={cat?.id}> {cat?.title} </option>
                      })
                    }
                      {/* <option value="0"> Select Category </option>
                          <option value="1"> Fruits </option>
                          <option value="2"> Vegetable </option>
                          <option value="3"> Masaly </option>
                          <option value="4"> Rice </option>
                          <option value="5"> Daily </option>
                          <option value="6"> Laundry </option>
                          <option value="7"> Coffee </option>
                          <option value="8"> Pizza </option> */}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label
                for="selectImage"
                sm={2}
              >
                Product Image
              </Label>
              <Col sm={10}>
                <Input
                  id="picture"
                  name="picture"
                  placeholder="Select product image"
                  type="file"
                  onChange={(e)=>handlePicture(e)}
                  required
                  multiple
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Button
                  className="px-4 w-25"
                  color="primary"
                  size="sm"
                  type="submit"
                  >
                  Add Product
              </Button>

              {/* <Button
                  className="px-4 mx-4 w-25"
                  color="secondary"
                  size="sm"
                  onClick={(e)=>handleClearForm(e)}
                  onChange={(e)=>handleChangeForm(e)}
                  >
                  Clear
              </Button> */}
            </FormGroup>
          </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AddProducts