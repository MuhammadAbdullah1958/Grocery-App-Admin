import Domain from "lib/Config";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import history from "@history.js";
export const GET_PRODUCTCOMMENTS = "[APP] GET_PRODUCTCOMMENTS";
export const GET_ADMIN_PRODUCTS = "[ADMIN] GET_ADMIN_PRODUCTS";
export const ADMIN_PRODUCT_LOADING = "[ADMIN] ADMIN_PRODUCT_LOADING";
export const ADMIN_PRODUCTDETAIL = "[ADMIN] ADMIN_PRODUCTDETAIL";
export const ADMIN_PRODDETAIL_LOADING = "[ADMIN] ADMIN_PRODDETAIL_LOADING";
export const ADMIN_PRODUCT_UPDATE = "[ADMIN] ADMIN_PRODUCT_UPDATE";
export const PRODUCT_IMAGE_DELETE = "[ADMIN] PRODUCT_IMAGE_DELETE";
export const ADMIN_PRODUCT_DELETE = "[ADMIN] ADMIN_PRODUCT_DELETE";
export const ADMIN_ADD_PRODUCT = "[ADMIN] ADMIN_ADD_PRODUCT";
export const GENERAL_LOADING = "[ADMIN] GENERAL_LOADING";
export const GET_SEARCH_PRODUCTS = "GET_SEARCH_PRODUCTS";
export const GET_ADMIN_CATEGORIES = "GET_ADMIN_CATEGORIES";
export const ADMIN_ADD_CATEGORY = "ADMIN_ADD_CATEGORY";
export const ADMIN_CATEGORY_DELETE = "ADMIN_CATEGORY_DELETE";
export const ADMIN_CATEGORY_DETAIL = "ADMIN_CATEGORY_DETAIL";
export const ADMIN_CATEGORY_UPDATE = "ADMIN_CATEGORY_UPDATE";


export function getProductComments(id) {
  const request = axios.get(`${Domain}/api/buyer/getProductComments`, {
    params: { id },
  });

  return (dispatch) =>
    request.then((response) => {
      return dispatch({
        type: GET_PRODUCTCOMMENTS,
        payload: response.data.comments,
      });
    });
}

// export function adminProductLoading(val) {
//   return (dispatch) => {
//     return dispatch({
//       type: ADMIN_PRODUCT_LOADING,
//       payload: val,
//     });
//   };
// }


// get all products
export function getAdminProducts(variables) {
  let filter=0, page=0;
  console.log("check for nan", variables?.filter !== NaN)
  if(variables!==undefined && variables?.filter !== NaN){
    
    filter = parseInt(variables?.filter);
    console.log("filter:", filter)
    console.log("0 called", typeof filter!==NaN);
    if(typeof filter===NaN){
      console.log("first if called")
      filter = 0;
    }
    // else{
    //   filter = parseInt(variables?.filter);
    //   console.log("second if called")
    // }

    console.log("3rd if called")
    page = parseInt(variables?.page);
  }

 
  
  console.log("page:", page)
  console.log("filter:", filter)
  const request = axios.post(
    `${Domain}/api/product/view`
    ,{
      limit: 10,
      page: page,
      id: filter
    },
    // { sorting, searchData, artType },
    // {
    //   params: {  },
    // }
  );

  return (dispatch) =>
      {
        dispatch({
          type: ADMIN_PRODUCT_LOADING,
          payload: true,
        })
        request
          .then((response) => {
            console.log("response get Admin Products :", response?.data?.result)
            return dispatch({
              type: GET_ADMIN_PRODUCTS,
              payload: response.data.result,
            });
          })
          // .then(() => NotificationManager.success("Products Fetched successfully!"))
          .catch((error) => {
            console.log("Error response get Admin Products:" ,error);
            // dispatch(adminProductLoading(false));
            error.response
              ? NotificationManager.error(error.response.data.msg)
              : NotificationManager.error("Error! Cannot fetch products");
          });
      }
}

        // get all categories
          export function getAdminCategories(variables) {
            let filter=0, page=0;
            if(variables!==undefined){
              filter = variables?.filter;
              page = variables?.page;
            }
            
            console.log("page:", page)
            const request = axios.post(
              `${Domain}/api/product/category/view`
              ,{
                limit: 10,
                page: page,
                id: filter
              },
              // { sorting, searchData, artType },
              // {
              //   params: {  },
              // }
            );

            return (dispatch) =>
              request
                .then((response) => {
                  console.log("response get Admin Categories :", response?.data?.result)
                  return dispatch({
                    type: GET_ADMIN_CATEGORIES,
                    payload: response.data.result,
                  });
                })
                // .then(() => NotificationManager.success("Categories Fetched successfully!"))
                .catch((error) => {
                  console.log("Error response get Admin Categories:" ,error);
                  // dispatch(adminProductLoading(false));
                  error.response
                    ? NotificationManager.error(error.response.data.msg)
                    : NotificationManager.error("Error! Cannot fetch Categories");
                });
          }

          export function adminProdDetailLoading(val) {
            return (dispatch) => {
              return dispatch({
                type: ADMIN_PRODDETAIL_LOADING,
                payload: val,
              });
            };
          }

// get by ID
export function adminProductDetail(id) {
  const request = axios.get(`${Domain}/api/product/view/${id}`, {
    // params: { id },
  });

  return (dispatch) =>
    request.
    then((response) => {
      console.log("Single ID Response:", response)
      return dispatch({
        type: ADMIN_PRODUCTDETAIL,
        payload: response.data.result,
      });
    })
    .catch((error)=>{
      console.log("Error not fetching Single Data:", error)
    })
}

//get single category
export function adminCategoryDetail(id) {
  const request = axios.get(`${Domain}/api/product/category/view/${id}`, {
    // params: { id },
  });

  return (dispatch) =>
    request.
    then((response) => {
      console.log("Single ID Category:", response)
      return dispatch({
        type: ADMIN_CATEGORY_DETAIL,
        payload: response.data.result,
      });
    })
    .catch((error)=>{
      console.log("Error not fetching Single Data:", error)
    })
}

// update product detail
export function adminProductUpdate(data) {

  // retrived id from form data
  const id = data.get("id")
  console.log("data id: ", id)

  // deleted id from form data
  data.delete("id")
  console.log("Data:", data)
  const request = axios.put(`${Domain}/api/product/update/${id}`, data);

  return (dispatch) =>
    request
      .then((response) => {
        console.log("response:", response)
        return dispatch({
          type: ADMIN_PRODUCT_UPDATE,
        });
      })
      .then(() => dispatch(adminGeneralLoading(false)))
      .then(() => dispatch(getAdminProducts(0)))
      // .then(()=> NotificationManager.success("Deleted Successfully"))
      .then(() => history.push({ pathname: "/admin/products" }))
      .catch((error) => {
        console.log("Error:", error)
        dispatch(adminGeneralLoading(false));
        error.response
          // ? NotificationManager.error(error.response.data.msg)
          ? NotificationManager.error("Updation Unsuccessfull")
          : NotificationManager.error("Failed to update");
      });
}

// update category
export function adminCategoryUpdate(data) {
  const id = data.get("id");
  data.delete("id")
  const title = data.get("title");
  const description = data.get("description");
  console.log("title, description, id:", title, description, id)

  const request = axios.put(`${Domain}/api/product/category/update/${id}`, {
    title: title,
    description: description
  });

  return (dispatch) =>
    request
      .then((response) => {
        console.log("response:", response)
        return dispatch({
          type: ADMIN_CATEGORY_UPDATE,
        });
      })
      .then(() => dispatch(adminGeneralLoading(false)))
      .then(() => dispatch(getAdminCategories(0)))
      // .then(()=> NotificationManager.success("Deleted Successfully"))
      .then(() => history.push({ pathname: "/admin/categories" }))
      .catch((error) => {
        console.log("Error:", error)
        dispatch(adminGeneralLoading(false));
        error.response
          // ? NotificationManager.error(error.response.data.msg)
          ? NotificationManager.error("Updation Unsuccessfull")
          : NotificationManager.error("Failed to update");
      });
}

export function deleteProductImage(data) {
  const request = axios.post(`${Domain}/api/admin/deleteProductImage`, data);

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: PRODUCT_IMAGE_DELETE,
        });
      })
      .then(() => dispatch(adminProductDetail(data.productId)))
      .catch((error) => {
        console.log(error);
      });
}

// delete product
export function deleteProduct(id) {
  console.log("ID:", id)
  const request = axios.put(`${Domain}/api/product/delete/${id}`, {
    params: { id },
  });

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_PRODUCT_DELETE,
        });
      })
      .then(() => NotificationManager.success("Products Deleted successfully!"))
      .then(() => dispatch(getAdminProducts(0)))
      .catch((error) => {
        console.log(error);
      });
}

// delete category
export function deleteCategory(id) {
  console.log("ID:", id)
  const request = axios.put(`${Domain}/api/product/category/delete/${id}`
  // , {
  //   params: { id },
  // }
  );

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_CATEGORY_DELETE,
        });
      })
      .then(() => NotificationManager.success("Category Deleted successfully!"))
      .then(() => dispatch(getAdminCategories()))
      .catch((error) => {
        console.log(error);
      });
}

// add new products
export function addNewProduct(data) {
  console.log("data:", data)
  const request = axios.post(`${Domain}/api/product/add`, data);

  return (dispatch) =>
    request
      .then((response) => {
        return dispatch({
          type: ADMIN_ADD_PRODUCT,
        });
      })
      .then(() => dispatch(adminGeneralLoading(false)))
      .then(() => NotificationManager.success("Product created successfully!"))
      .catch((error) => {
        console.log("Error:", error)
        dispatch(adminGeneralLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Failed to add product");
      });
}

// add new category
export function addNewCategory(data) {
  const title = data.get("title")
  const description = data.get("description");
  console.log("Dataaaaas:", title, description)

  // console.log("data:", data)
  const request = axios.post(`${Domain}/api/product/category/add`, {
    title: title,
    description: description,
  });

  return (dispatch) =>
    request
      .then((response) => {
        console.log("response:", response)
        return dispatch({
          type: ADMIN_ADD_CATEGORY,
        });
      })
      // .then(() => dispatch(adminGeneralLoading(false)))
      .then(() => NotificationManager.success("Category created successfully!"))
      .catch((error) => {
        console.log("Error:", error)
        dispatch(adminGeneralLoading(false));
        error.response
          ? NotificationManager.error(error.response.data.msg)
          : NotificationManager.error("Failed to add Category");
      });
}


export function adminGeneralLoading(val) {
  return (dispatch) => {
    return dispatch({
      type: GENERAL_LOADING,
      payload: val,
    });
  };
}
