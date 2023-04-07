import * as Actions from "../actions";
import moment from "moment";
import { isAxiosError } from "axios";

const initialState = {
  AdminProducts: {
    Loading: false,
    rows: null,
    totalProducts: null,
  },
  AdminProdDetail: {
    Loading: false,
    details: null,
  },
  AdminCategoryDetail: {
    Loading: false,
    details: null,
  },
  // AdminSearchProduct:{
  //   product: null
  // },
  productComments: [],
  Orders: {
    Loading: false,
    rows: null,
    totalOrders: null,
    error: null,
  },
  OrderDetails: {
    Loading: false,
    details: null,
  },
  TaxData: {
    Loading: false,
    tax: null,
  },
  BusinessFraming: {
    Loading: false,
    rows: null,
    total: null,
    error: null,
    detail: null,
  },
  ArtistFraming: {
    Loading: false,
    rows: null,
    total: null,
    error: null,
    detail: null,
  },
  GalleryWall: {
    Loading: false,
    rows: null,
    total: null,
    error: null,
    detail: null,
  },
  FramePrices: {
    Loading: false,
    rows: null,
    error: null,
  },
  Coupons: {
    Loading: false,
    rows: null,
    totalCoupons: null,
  },
  GiftCards: {
    Loading: false,
    rows: null,
    totalGiftCards: null,
  },
  SendGridTemplates: {
    Loading: false,
    templates: null,
    errors: null,
  },
  Blogs: {
    Loading: false,
    error: null,
    total: null,
    rows: null,
    detail: null,
  },
  OrderCountGraph: {
    Loading: false,
    day: null,
    month: null,
    customerData: null,
  },
  OrderPieGraph: {
    Loading: false,
    labels: null,
    totalOrders: null,
    data: null,
    countByStatus: null,
    recentOrders: null,
  },
  AdminCategories:{
    Loading: false,
    categories: null,
    totalCategories: null,
  }
};

const adminReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.PRICES_LOADING: {
      return {
        ...state,
        FramePrices: {
          ...state.FramePrices,
          Loading: action.payload,
        },
      };
    }
    case Actions.PRICES_ERROR: {
      return {
        ...state,
        FramePrices: {
          Loading: false,
          error: action.payload,
          rows: null,
        },
      };
    }

    // orders from the client
    case Actions.GET_ORDERS_ADMIN: {
      let totalOrders;
      let rows = [];
      if (action.payload) {
        let res = action.payload;
        totalOrders = res.count;
        rows = res.rows.map((idx) => ({
         address: idx.address,
         amount: idx.amount,
         city: idx.clientId,
         confirmed: idx.confirmed,
         dateOrder: idx.dateOrderPlaced,
         delieveryCharge: idx.delieveryCharge,
         id: idx.id,
         intentId: idx.intentId,
         note: idx.note,
         phone: idx.phone,
         status: idx.status,
        }));
      }
      return {
        ...state,
        Orders: { totalOrders, rows, Loading: false, error: null },
      };
    }


    case Actions.ADMIN_ORDER_LOADING: {
      return {
        ...state,
        Orders: {
          ...state.Orders,
          Loading: action.payload,
        },
      };
    }
    case Actions.ADMIN_ORDER_ERROR: {
      return {
        ...state,
        Orders: {
          Loading: false,
          error: action.payload,
          rows: null,
          totalOrders: null,
        },
      };
    }

    // Single Order Detail
    case Actions.ORDERS_DETAIL_ADMIN: {
      let totalOrders;
      let rows = [];
      if (action.payload) {
        let res = action.payload;
        totalOrders = res.count;
        console.log("response 1: ", res)
        rows = res;
      }
      console.log("Response 2:", rows)
      return {
        ...state,
        OrderDetails: {
          Loading: false,
          details: rows,
        },
      };
    }

    // Single Category Detail
    case Actions.ADMIN_CATEGORY_DETAIL: {
      let rows;
      if (action.payload) {
        let res = action.payload;
        rows = res;
      }
      console.log("Response :", rows)
      return {
        ...state,
        AdminCategoryDetail: {
          Loading: false,
          details: rows,
        },
      };
    }

    case Actions.ORDER_DETAIL_LOADING: {
      return {
        ...state,
        OrderDetails: {
          ...state.OrderDetails,
          Loading: action.payload,
        },
      };
    }

    // get products
    case Actions.GET_ADMIN_PRODUCTS: {
      let resFormattedMapped = [];
      let totalProducts;
      if (action.payload) {
        let res = action.payload;
        console.log("Response reducer:", res);
        totalProducts = res.count;
        resFormattedMapped = res.rows.map((inv) => ({
          id: inv.id,
          title: inv.title,
          price: inv.price,
          discount: inv.discount,
          description: inv.description,
          unitQuantity: inv.unitQuantity,
          categoryId: inv.categoryId,
          // productimages: inv.productImages[0],
          productimages: inv.productImages,
          quantity: inv.quantity,
        }));
        console.log("resFormattedMapped:", resFormattedMapped)
      }
      console.log("resFormattedMapped:", resFormattedMapped)
      return {
        ...state,
        AdminProducts: {
          Loading: false,
          rows: resFormattedMapped,
          totalProducts,
          // totalProducts
        },
      };
    }

    // get products Loading
    case Actions.ADMIN_PRODUCT_LOADING: {
      if (action.payload) {
        return {
          ...state,
          AdminProducts: {
            ...state.AdminProducts,
            Loading: action.payload,
          },
        };
      } else return state;
    }
    

    // get categories
    case Actions.GET_ADMIN_CATEGORIES: {
      let resFormattedMapped = [];
      let totalCategories;
      if (action.payload) {
        let res = action.payload;
        console.log("Response reducer:", res);
        totalCategories = res.count;
        resFormattedMapped = res;
        // console.log("resFormattedMapped:", resFormattedMapped)
      }
      console.log("resFormattedMapped:", resFormattedMapped)
      return {
        ...state,
        AdminCategories: {
          Loading: false,
          categories: resFormattedMapped,
          totalCategories: totalCategories,
        },
      };
    }


    // get single product details
    case Actions.ADMIN_PRODUCTDETAIL: {
      let resFormattedMapped = {};
      if (action.payload) {
        let product = action.payload;
        console.log("Product:", product)
        resFormattedMapped = {
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount,
          description: product.description,
          unitQuantity: product.unitQuantity,
          categoryId: product.categoryId,
          productimages: product.productImages,
          quantity: product.quantity,
        }
        // resFormattedMapped = {
        //   id: product.id,
        //   name: product.name,
        //   moulding: product.moulding,
        //   color: product.color,
        //   mouldingSize: product.mouldingSize,
        //   artType: product.artType,
        //   active: product.active,
        //   recommended: product.recommended,
        //   shortDescription: product.shortDescription,
        //   details: product.details,
        //   pictures: product.productimages.map((pix) => ({
        //     id: pix.id,
        //     image: pix.image,
        //   })),
        //   createdAt: moment(product.createdAt).format("MMM DD YYYY h:mm A"),
        // };
      }
      return {
        ...state,
        AdminProdDetail: {
          Loading: false,
          details: resFormattedMapped,
        },
      };
    }
    case Actions.ADMIN_PRODDETAIL_LOADING: {
      if (action.payload) {
        return {
          ...state,
          AdminProdDetail: {
            ...state.AdminProdDetail,
            Loading: action.payload,
          },
        };
      } else return state;
    }
    default: {
      return state;
    }
  }
};

export default adminReducer;
