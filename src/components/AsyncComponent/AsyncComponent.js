/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "components/RctPageLoader/RctPageLoader";
import PreloadTable from "components/PreloadLayout/PreloadTable";
import PreloadProduct from "components/PreloadLayout/preloadProduct";

// ecommerce dashboard
const AsyncEcommerceDashboardComponent = Loadable({
  loader: () => import("routes/dashboard"),
  loading: () => <RctPageLoader />,
});

const AsyncProduct = Loadable({
  loader: () => import ("components/pages/Products"),
  loading: () => <RctPageLoader />,
});

const AsyncProductDetail = Loadable({
  loader: () => import ("components/pages/ProductDetail"),
  loading: () => <RctPageLoader />,
});

const AsyncAddProduct = Loadable({
  loader: () => import ("components/pages/AddProducts"),
  loading: () => <RctPageLoader />,
});

const AsyncCategories = Loadable({
  loader: () => import ("components/pages/Categories"),
  loading: () => <RctPageLoader />,
});

const AsyncAddCategories = Loadable({
  loader: () => import ("components/pages/AddCategories"),
  loading: () => <RctPageLoader />,
});

const AsyncCustomersListComponent = Loadable({
  loader: () => import("routes/customers/CustomersList"),
  loading: () => <PreloadTable />,
});
const AsyncCustomerViewComponent = Loadable({
  loader: () => import("routes/customers/ViewCustomer"),
  loading: () => <RctPageLoader />,
});
const AsyncCustomerDetailComponent = Loadable({
  loader: () => import("routes/customers/EditCustomer"),
  loading: () => <RctPageLoader />,
});

const AsyncCustomerLogout = Loadable({
  loader: () => import ("routes/customers/Logout"),
  loading: () => <RctPageLoader />,
});

const AsyncPriceList = Loadable({
  loader: () => import ("components/pages/PriceList"),
  loading: () => <RctPageLoader />,
});

const AsyncOrders = Loadable({
  loader: () => import ("components/pages/Orders"),
  loading: () => <RctPageLoader />,
});

const AsyncOrderDetails = Loadable({
  loader: () => import ("components/pages/OrderDetails"),
  loading: () => <RctPageLoader />,
});

export {
  AsyncEcommerceDashboardComponent,
  AsyncCustomersListComponent,
  AsyncCustomerViewComponent,
  AsyncCustomerDetailComponent,
  AsyncCustomerLogout,
  AsyncProduct,
  AsyncAddProduct,
  AsyncPriceList,
  AsyncOrders,
  AsyncOrderDetails,
  AsyncProductDetail,
  AsyncCategories,
  AsyncAddCategories
};
