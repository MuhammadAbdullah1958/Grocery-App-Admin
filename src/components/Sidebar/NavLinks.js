// nav links
const navlinks = [
  {
    id: 1,
    menu_title: "Dashboard",
    menu_icon: "zmdi zmdi-view-dashboard",
    path: "/admin/dashboard",
    child_routes: null,
  },
  {
    id: 2,
    menu_title: "products",
    menu_icon: "zmdi zmdi-shopping-cart",
    child_routes: [
      { path: "/admin/products", menu_title: "products" },
      { path: "/admin/addproducts", menu_title: "addproducts" },
    ],
  },
  {
    id: 3,
    menu_title: "Customers",
    menu_icon: "zmdi zmdi-accounts-alt",
    path: "/admin/customerslist",
    child_routes: null,
  },
  {
    id: 4,
    menu_title: "Orders",
    menu_icon: "zmdi zmdi-money-box",
    path: "/admin/orderslist",
    child_routes: null,
  },
  {
    id: 5,
    menu_title: "Categories",
    menu_icon: "zmdi zmdi-card-giftcard",
    path: "/admin/categories",
    child_routes: null,
  },
  {
    id: 6,
    menu_title: "Logout",
    menu_icon: "zmdi zmdi-mail-reply-all",
    path: "/admin/logout",
    child_routes: null,
  },
];

export default navlinks;
