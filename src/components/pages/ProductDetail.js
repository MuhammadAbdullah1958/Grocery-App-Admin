import React from 'react'
import "./productDetail.css"
import { useState } from 'react';
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { RxPencil2 } from 'react-icons/rx';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useEffect } from 'react';
import { getAdminProducts, adminProductDetail, adminProductUpdate } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalFooter, Button, ModalHeader, ModalBody, Form } from "reactstrap"
import Carousel from "react-elastic-carousel";

const breakPoints = [
  {width:1, itemsToShow: 1},
  {width:550, itemsToShow: 2},
  {width:768, itemsToShow: 4},
  {width:1200, itemsToShow: 5},
  {width:1600, itemsToShow: 6}
]

const ProductDetails = () => {
  useEffect(()=>{
    dispatch(adminProductDetail(id));    
    dispatch(getAdminProducts());
  }, [])

  const formData = new FormData();

   // Modal open state
   const [modal, setModal] = React.useState(false);
  console.log("Form data:", formData.get("uploaded_file"))
   // Toggle for Modal
   const toggle = () => {
    setModal(!modal);
    setProductDetails({
      id: productDetail?.id,
      title: productDetail?.title,
      price: productDetail?.price,
      discount: productDetail?.discount,
      description: productDetail?.description,
      quantity: productDetail?.quantity,
      categoryId: productDetail?.categoryId,
      // productImage: productDetail?.productimages,
    })
   } 

  const { id } = useParams();
  console.log("id: ", id)

  const response = useSelector((state)=> state);
  console.log("Response:", response)

  const products = response?.admin?.AdminProducts?.rows;
  console.log("Products :", products)

  const productDetail = response?.admin?.AdminProdDetail?.details;
  console.log("Product Detail:", productDetail)

  const [imageArray, setImageArray] = useState()
  console.log("New Image Array:", imageArray)

  useEffect(()=>{
    setImageArray(productDetail?.productimages);
  }, productDetail?.productimages)

  const dispatch = useDispatch();  

  const [productDetails, setProductDetails] = useState({ })
  console.log("Product details:", productDetails)

  const handleProductUpdate = (e) =>{
    e.preventDefault();

    const typeOfName = typeof productDetails?.title;
    if(typeOfName!=="string"){
      alert("Title must be string")
    }
    else{
        // Populate Form Data
    formData.append("id", id)
    formData.append("title", productDetails.title)
    formData.append("price", productDetails.price)
    formData.append("description", productDetails.description)
    formData.append("categoryId", productDetails.categoryId)
    formData.append("quantity", productDetails.quantity)
    formData.append("discount", productDetails.discount)

     const productImg = formData.getAll("uploaded_file")
     console.log("Image in from data:", productImg);

     if(productImg===null || productImg.length===0){
      const urlArray = [];
      imageArray?.map((array, index)=>{
        urlArray.push(array?.url)
      })
      
      // image Url - update
      formData.append("url", JSON.stringify(urlArray.map((u) => u.toString())));
      console.log("URL Images:", formData.get("url"))
      // console.log("url array:", urlArray)
      // const urlFromForm = (formData.get("url"));
      // console.log("image added:", JSON.parse(urlFromForm))
      // debugger
      }


      dispatch(adminProductUpdate(formData));
      }
  }

  const handleChangeForm = (e) => {
    const {name, value, type} = e.target;

    setProductDetails({
      ...productDetails,
      [name]: value
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

    // formData.append("uploaded_file",  e.target.files[0])
    // console.log( formData.get("uploaded_file"))
  }

  const handleDeleteImage = (index) =>{
    let newImageArray = [...imageArray];
    newImageArray.splice(index, 1);
    setImageArray(newImageArray);
  }

  // read more
  var description = productDetail?.description;
  console.log("description:", description)
  var startDescription = description?.substring(0, 20);
  console.log("start Description:", startDescription)
  var remainingDescription = description?.substring(21);
  console.log("remainingDescription:", remainingDescription)

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

  return (
    <>
    
    <Container>
    <IoIosArrowBack size={20} style={{cursor:"pointer"}} onClick={()=> window.history.back()} />
      <Row className="mt-4">
        <Col lg={6} className="mx-2 p-3" style={{boxShadow:"1px 1px 2px gray"}}>
        {/* <p className='text-gray' style={{fontSize:"12px", textDecoration:"underline"}}>Product Image</p> */}
        <div style={{overflowY:"scroll", height:"250px", overflowY:"hidden"}}>
          <Carousel breakPoints={breakPoints}>
          {
            productDetail?.productimages?.map((image, index)=>{
            return <img className='my-3' src={image?.url} style={{width:"100%", height:"250px", objectFit:"contain", display:"block"}} alt="" />
            })
          }   
          </Carousel>
        </div>
      
          {/* <img src={productDetail?.productimages[2].url} style={{width:"100%", display:"block"}} alt="" /> */}
        </Col>
        <Col lg={5} className="p-4" style={{backgroundColor:"#EEEEEE", boxShadow:"1px 1px 2px gray"}}>

        {/* <p className='text-gray' style={{fontSize:"12px", textDecoration:"underline"}}>Client Details</p> */}
          <Row className='d-flex justify-content-end'>
              <RxPencil2 className='mx-2' size={20} style={{cursor:"pointer", color:"blue"}} data-placement="top"
               data-toggle="tooltip" title="Update Product" onClick={()=>toggle()}/>           
          </Row>
        
          <Row>
            <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>ID</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px"}} className="mx-4">{productDetail?.id}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>Title</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px"}} className="mx-4">{productDetail?.title}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>Description</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px", width:"100%", textAlign: "justify", textJustify: "inter-word"}} className="mx-4">
            {isReadMore ? productDetail?.description?.slice(0, 50) : productDetail?.description}
            <span onClick={toggleReadMore} style={{cursor:"pointer", color:"blue"}} className="read-or-hide">
              { productDetail?.description?.length>50 ? isReadMore ? "...read more" : " show less" : ""}
            </span>
            </p>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>Price</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px"}} className="mx-4">{productDetail?.price}</p>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>Discount</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px"}} className="mx-4">{productDetail?.discount}</p>
            </Col>
          </Row>
          <Row>
           <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>Category ID</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px"}} className="mx-4">{productDetail?.categoryId}</p>
            </Col>
          </Row>
          <Row>
           <Col lg={3}>
            <p style={{fontSize:"12px", fontWeight:"500"}}>Quantity</p>
            </Col>
            <Col lg={6}>
            <p style={{fontSize:"12px"}} className="mx-4">{productDetail?.quantity}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    {/* Update Data Model */}
    <div style={{
            display: 'block', width: "100%", padding: 30
        }}>
            <Modal isOpen={modal} toggle={toggle} style={{height:"80vh"}}>
                <ModalHeader
                    toggle={toggle}>Product Details</ModalHeader>
                <ModalBody>
                  <Form onSubmit={(e)=>handleProductUpdate(e)}>
                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>ID</p>
                      </Col>
                      <Col lg={8}>
                      <input className='mx-2' name='id' value={productDetails?.id}
                       type="text" style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required/>
                      </Col>
                    </Row>

                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>Title</p>
                      </Col>
                      <Col lg={8}>
                      <input className='mx-2' name='title' value={productDetails?.title} type="text"
                       style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required/>
                      </Col>
                    </Row>

                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>Description</p>
                      </Col>
                      <Col lg={8}>
                        <textarea className='mx-2 mb-3' name="description" value={productDetails?.description}
                       type="text" style={{height:"54px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required>

                        </textarea>
                      {/* <input className='mx-2' name="description" value={productDetails?.description}
                       type="text" style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required/> */}
                      </Col>
                    </Row>

                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>Price</p>
                      </Col>
                      <Col lg={8}>
                      <input className='mx-2' type="text" name="price" value={productDetails?.price}
                       style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required/>
                      </Col>
                    </Row>

                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>Discount</p>
                      </Col>
                      <Col lg={8}>
                      <input className='mx-2' type="text" name="discount" value={productDetails?.discount}
                       style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required/>
                      </Col>
                    </Row>

                    
                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>Category Id</p>
                      </Col>
                      <Col lg={8}>
                      {/* <input className='mx-2' type="text" name="categoryId"
                       value={productDetails?.categoryId} style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>handleChangeForm(e)}
                       required
                       /> */}
                       <select className='mx-2' value={productDetails?.categoryId}
                        id="categoryId" name="categoryId"
                        onChange={(e)=>handleChangeForm(e)}
                        style={{height:"26px", width:"100%", paddingLeft:"3%"}}
                        >
                        <option value="1"> Fruits </option>
                        <option value="2"> Vegetable </option>
                        <option value="3"> Masaly </option>
                        <option value="4"> Rice </option>
                        <option value="5"> Daily </option>
                        <option value="6"> Laundry </option>
                        <option value="7"> Coffee </option>
                        <option value="8"> Pizza </option>
                       </select>
                      </Col>
                    </Row>

                      
                    <Row className="d-flex">
                      <Col lg={3}>
                      <p className='mx-2' style={{fontSize:"15px", fontWeight:"500"}}>Quantity</p>
                      </Col>
                      <Col lg={8}>
                      <input className='mx-2' type="number" name="quantity"
                       value={productDetails?.quantity} style={{height:"25px", width:"100%", padding:"2%"}}
                       onChange={(e)=>{
                        if(e.target.value>0){
                          handleChangeForm(e)
                        }
                        else{
                          alert("Quantity is less than 0")
                        }
                       }}
                       required
                       />
                      </Col>
                    </Row>

                    <Row className="d-flex justify-content-center images-row">
                   
                      {
                        imageArray === undefined || imageArray === null
                        ?
                        <p> No images Found </p> 
                        :
                        imageArray && imageArray.map((image, index)=>{
                        return <Col lg={6} className="update-images" onClick={(e)=>handleDeleteImage(index)}>
                        <img className='my-3 image' src={image?.url} style={{ display:"block", cursor: "pointer"}} alt="" 
                        />
                        <RiDeleteBin5Line className='mx-2 middle' size={40} style={{cursor:"pointer", color:"red"}} data-placement="top" 
                        data-toggle="tooltip" title="Delete Image"/>
                        </Col>
                        })
                      }
                    
                    </Row>

                    <Row className="my-2">
                    <Col lg={3}>
                      <p className='mt-2' style={{fontSize:"15px", marginLeft:"5%", fontWeight:"500"}}>Product IMG</p>
                      </Col>
                      <Col lg={8}>
                      <input className='mx-2' type="file" style={{width:"100%", padding:"2%"}}
                      onChange={(e)=>handlePicture(e)} multiple
                      />
                      </Col>
                    </Row>

                    <Button className="mx-auto w-100" type="submit" size="small" color="primary">Update</Button>{' '}

                  </Form>
                </ModalBody>
               
            </Modal>
        </div >
    </>
  )
}

export default ProductDetails