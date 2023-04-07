import { Description } from '@material-ui/icons'
import React from 'react'
import { useMutation } from 'react-query'
import { useState } from 'react'
import axios from 'axios'
import Domain from 'lib/Config'
import { addNewCategory } from 'store/actions'
import { Form, FormGroup, FormText, Label, Row, Col, Input, Button  } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { redirect } from 'react-router'
import { IoIosArrowBack } from 'react-icons/io';
import { BiCategory } from 'react-icons/bi';
import { useHistory } from 'react-router-dom'

const AddCategories = () => {
  const history = useHistory();

    const formData = new FormData();
    const dispatch = useDispatch();
    
  //   const mutation = useMutation(newProductDetail => {
  //   const response = axios.post(`${Domain}/api/product/add`, newProductDetail)
  //   console.log("new product details:", newProductDetail)
  //   console.log("Response:", response)
  //   return response;
  // })

  const [categoryDetail, setCategoryDetails] = useState({
    title:"",
    description:"",
  })

  const handleChangeForm = (e) => {
    const {name, value} = e.target;

    setCategoryDetails({
      ...categoryDetail,
      [name]: value
    })
  }

    const handleSubmitForm = (e) =>{
      e.preventDefault();
      console.log("categoryDetail:", categoryDetail)

            // Populate Form Data
            formData.append("title", categoryDetail.title)
            formData.append("description", categoryDetail.description)

            console.log("title:", formData.get("title"))
            console.log("description:", formData.get("description"))
            dispatch(addNewCategory(formData));

            setTimeout(()=>{
              history.push("categories")
            }, 1000)

    // const {id, title, price, discount, description, quantity, categoryId} = productDetails;
    // mutation.mutate({title, pictureDetails, price, description, categoryId, quantity, discount })
  }

  return (
    <>
    <IoIosArrowBack size={20} style={{cursor:"pointer"}} onClick={()=> window.history.back()} />
      <Row className="my-3 mx-1 py-2 w-75 mx-auto" style={{boxShadow:"1px 1px 3px gray", borderRadius:"12px" , backgroundColor:"white"}}>
       
       <div className='m-3 d-flex'>
       <BiCategory size={24}/> <h4 className='mx-2 mt-1'> Add Category </h4>
       </div>

        <Col lg={12}>
            <div className='container-fluid my-2' style={{padding:"2%", boxShadow:"0px 0px 2px gray", backgroundColor:"#FAFAFA"}}>

            <Form onSubmit={(e)=>handleSubmitForm(e)}>
              <FormGroup row>
                <Label
                  for="title"
                  sm={2}
                  style={{fontWeight:"500"}}
                >
                  Title
                </Label>
                <Col sm={10}>
                  <Input
                   style={{
                    boxShadow:"1px 1px 2px gray"
                  }}
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    type="text"
                    value={categoryDetail.title}
                    onChange={(e)=>handleChangeForm(e)}
                    required
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label
                  style={{fontWeight:"500"}}
                  for="description"
                  sm={2}
                >
                  Description
                </Label>
                <Col sm={10}>
                  <Input
                    style={{
                      boxShadow:"1px 1px 2px gray"
                    }}
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    type="text"
                    value={categoryDetail.description}
                    onChange={(e)=>handleChangeForm(e)}
                    required
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
                    Add Category
                </Button>

                {/* <Button
                    className="px-4 mx-4 w-25"
                    color="secondary"
                    size="sm"
                    // onClick={(e)=>handleClearForm(e)}
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

export default AddCategories