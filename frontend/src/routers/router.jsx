import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/merchandises/CartPage";
import CheckoutPage from "../pages/merchandises/CheckoutPage";
import SingleMerchandise from "../pages/merchandises/SingleMerchandise";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/merchandises/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageMerchandise from "../pages/dashboard/manageMerchandise/ManageMerchandise";
import AddMerchandise from "../pages/dashboard/addMerchandise/AddMerchandise";
import UpdateMerchandise from "../pages/dashboard/EditMerchandise/UpdateMerchandise";
import TotalOrders from "../pages/dashboard/totalOrders/TotalOrders";
import Shop from "../pages/shop/Shop";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Settings from "../pages/dashboard/settings/Settings";
import Help from "../pages/dashboard/help/Help";
import UserDashboard from "../pages/dashboard/users/UserDashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/shop",
            element: <Shop />
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/merchandises/:id",
          element: <SingleMerchandise/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        }
        
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-merchandise",
          element: <AdminRoute>
            <AddMerchandise/>
          </AdminRoute>
        },
        {
          path: "edit-merchandise/:id",
          element: <AdminRoute>
            <UpdateMerchandise/>
          </AdminRoute>
        },
        {
          path: "manage-merchandise",
          element: <AdminRoute>
            <ManageMerchandise/>
          </AdminRoute>
        },
        {
          path: "total-orders",
          element: <AdminRoute>
            <TotalOrders/>
          </AdminRoute>
        },
        {
          path: "settings",
          element: <AdminRoute>
            <Settings/>
          </AdminRoute>
        },
        {
          path: "help",
          element: <AdminRoute>
            <Help/>
          </AdminRoute>
        }
      ]
    }
  ]);

  export default router;