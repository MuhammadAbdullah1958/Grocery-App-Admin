import { Description } from '@material-ui/icons'
import React from 'react'
import { useMutation } from 'react-query'
import { useState } from 'react'
import axios from 'axios'
import Domain from 'lib/Config'
import { addNewProduct } from 'store/actions'
import { Form, FormGroup, FormText, Label, Col, Input, Button  } from 'reactstrap'
import { useDispatch } from 'react-redux'

const AddProducts = () => {

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

    // var pictureDetails;
    // const handlePicture = (e) => {
    //   // setSelectedImage(e.target.files)
        
    //   // console.log("Form Data:", formData.get("productPicture"))
    //   // pictureData = formData.append(e.target.name, e.target.files[0]);
    //   // console.log("file Detail:" , formData.get("selectImage"))
        
    // }

    const handleSubmitForm = (e) =>{
    e.preventDefault();

          // Populate Form Data
          formData.append("title", productDetails.title)
          formData.append("price", productDetails.price)
          formData.append("description", productDetails.description)
          formData.append("categoryId", productDetails.categoryId)
          formData.append("quantity", productDetails.quantity)
          formData.append("discount", productDetails.discount)
      
        //   dispatch(addNewProduct(formData));
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
    formData.append("uploaded_file",  e.target.files[0])
    console.log( formData.get("uploaded_file"))
  }

  return (
    <>
        <h3>Add ID Wala Products</h3>
        <div className='container-fluid'>
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
                placeholder="_ _ _"
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
                placeholder="_ _ _"
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
                placeholder="_ _ _"
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
                placeholder="_ _ _"
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
                placeholder="_ _ _"
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
              <Input
                id="categoryId"
                name="categoryId"
                placeholder="_ _ _"
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
            <Col sm={10}>
              <Input
                id="picture"
                name="picture"
                placeholder="_ _ _"
                type="file"
                onChange={(e)=>handlePicture(e)}
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
                Submit
            </Button>

            <Button
                className="px-4 mx-4 w-25"
                color="secondary"
                size="md"
                onClick={(e)=>handleClearForm(e)}
                onChange={(e)=>handleChangeForm(e)}
                >
                Clear
            </Button>
          </FormGroup>
        </Form>
       </div>
    </>
  )
}

export default AddProducts