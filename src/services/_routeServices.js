// async component
import {
  AsyncEcommerceDashboardComponent,
  AsyncCustomersListComponent,
  AsyncCustomerDetailComponent,
  AsyncCustomerViewComponent,
  AsyncCustomerLogout,
  AsyncProduct,
  AsyncAddProduct,
  AsyncPriceList,
  AsyncOrders,
  AsyncOrderDetails,
  AsyncProductDetail,
  AsyncCategories,
  AsyncAddCategories
} from "components/AsyncComponent/AsyncComponent";

export default [
  {
    path: "dashboard",
    component: AsyncEcommerceDashboardComponent,
  },
  {
    path: "products",
    component: AsyncProduct,
  },
  {
    path: "productDetail/:id",
    component: AsyncProductDetail,
  },
  {
    path: "addproducts",
    component: AsyncAddProduct,
  },
  {
    path: "Categories",
    component: AsyncCategories,
  },
  {
    path: "addCategories",
    component: AsyncAddCategories,
  },
  {
    path: "customerslist",
    component: AsyncCustomersListComponent,
  },
  {
    path: "view-customer/:id",
    component: AsyncCustomerViewComponent,
  },
  {
    path: "edit-customer/:id",
    component: AsyncCustomerDetailComponent,
  },
  {
    path: "pricelist",
    component: AsyncPriceList,
  },
  {
    path: "logout",
    component: AsyncCustomerLogout,
  },
  {
    path: "orderslist",
    component: AsyncOrders,
  },
  {
    path: "order-details/:id",
    component: AsyncOrderDetails,
  },
];
