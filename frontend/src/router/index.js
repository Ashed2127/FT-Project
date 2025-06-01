import { createWebHistory, createRouter } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Menu from '../pages/Menu.vue';
import Table from '../pages/Table.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';
import Thank from '../pages/Thank.vue';
import MyOrder from '../pages/MyOrder.vue';
// import Admin from '../admin/Admin.vue';
import Dashboard from '../admin/Dashboard.vue';
import AdminRegister from '../admin/AdminRegister.vue';
import AdminLogin from '../admin/AdminLogin.vue';
import DpDashboard from '../admin/DpDashboard.vue';
import MyTables from '../pages/MyTables.vue';
import DpRegister from '../admin/DpRegister.vue';
import DpLogin from '../admin/DpLogin.vue';
// import  Chapa  from "../chapa.vue";
// import newPay from "../pages/Voice.vue";
import Pay from "../pages/pay.vue";
// import axios from "axios";
import UpdateAmount from '../admin/UpdateAmount.vue';
import TableDashboard from "../admin/TableDashboard.vue";
import Myprofile from "../pages/myprofile.vue";
import DpDelete from "../admin/dpDelete.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
 
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/adminlogin",
    name: "AdminLogin",
    component: AdminLogin,
  },
  
  {
    path: "/adminregister",
    name: "AdminRegister",
    component: AdminRegister,
  },

  {
    path: "/dpregister",
    name: "DpRegister",
    component: DpRegister,
  },{
    path: "/dplogin",
    name: "DpLogin",
    component: DpLogin,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/DpDashboard",
    name: "DpDashboard",
    component: DpDashboard,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/thank",
    name: "Thank",
    component: Thank,
  },
  {
    path: "/myorder",
    name: "MyOrder",
    component: MyOrder,
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: Admin,
  // },
  {
    path: "/mytables",
    name: "MyTables",
    component: MyTables,
  },
  // {
  //   path: "/chapa",
  //   name: "Chapa",
  //   component: Chapa,
  // },
  // {
  //   path: "/voice",
  //   name: "Voice",
  //   component: Voice,
  // },
  {
    path: "/pay",
    name: "Pay",
    component: Pay,
  },
  // {
  //   path: "/newPay",
  //   name: "newPay",
  //   component: newPay,
  // },

  {
    path: "/updateamount",
    name: "UpdateAmount",
    component: UpdateAmount,
  },
  {
    path: "/tabledashboard",
    name: "TableDashboard",
    component: TableDashboard,
  },
  {
    path: "/myprofile",
    name: "myprofile",
    component: Myprofile, 
  },
  {
    path: "/dpDelete",
    name: "DpDelete",
    component: DpDelete,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home,
    // https://stackoverflow.com/questions/68504803/how-can-i-make-a-catch-all-other-route-in-vue-router-also-catch-the-url-when-p
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


//   router.beforeEach(async(to, from, next) => {
//   if (to.name === 'AdminRegister') {
//     // Fetch admin data here...
//     let getAdmin = [];
//     const adminData = await axios.get('/admindata', getAdmin);// Get admin data from admin table;
    
    

//     // Check if admin data exists
//     if (adminData && adminData.admin_email > 0) {
//       // If admin data exists, prevent routing to /adminregister
//       next(false);
//     } else {
//       // If admin data does not exist, allow routing to /adminregister
//       next();
//     }
//   }
// });


export default router;