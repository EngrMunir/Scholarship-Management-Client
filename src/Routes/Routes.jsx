import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import Details from "../Pages/Details/Details";
import Payment from "../Pages/Payment/Payment";
import Dashboard from "../Layout/Dashboard";
import UserApplication from "../Pages/Dashboard/UserApplication/UserApplication";
import UserReviews from "../Pages/Dashboard/UserReviews/UserReviews";
import AddScholarship from "../Pages/Dashboard/AddScholarShip/AddScholarship";
import ManageScholarship from "../Pages/Dashboard/ManageScholarship/ManageScholarship";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageReview from "../Pages/Dashboard/ManageReview/ManageReview";
import AllAppliedScholarship from "../Pages/Dashboard/AllAppliedScholarship/AllAppliedScholarship";
import UpdateApplication from "../Pages/Dashboard/UpdateApplication/UpdateApplication";
import AllReview from "../Pages/Dashboard/AllReview/AllReview";
import AppliedDetails from "../Pages/Dashboard/AppliedDetails/AppliedDetails";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
          path:'/scholarships',
          element:<AllScholarship></AllScholarship>
        },
        {
          path:'/details/:id',
          element:<Details></Details>,
          loader:({params})=>fetch(`https://scholarship-management-server-one.vercel.app/scholarship/${params.id}`)
        },
        {
          path:'/update/:id',
          element:<UpdateApplication></UpdateApplication>,
          loader:({params})=>fetch(`https://scholarship-management-server-one.vercel.app/applied-scholarship/${params.id}`)
        },
        {
          path:'/payment/:id',
          element:<Payment></Payment>
        },
        {
          path:'/appliedDetails/:id',
          element:<AppliedDetails></AppliedDetails>,
          loader:({params})=>fetch(`https://scholarship-management-server-one.vercel.app/applied-scholarship/${params.id}`)
        }
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // normal user routes
        {
          path:'userApplication',
          element:<UserApplication></UserApplication>
        },
        {
          path:'userReviews',
          element:<UserReviews></UserReviews>
        },
        // admin routes
        {
          path:'profile',
          element:<Profile></Profile>
        },
        {
          path:'addScholarship',
          element:<AddScholarship></AddScholarship>
        },
        {
          path:'manageScholarship',
          element:<ManageScholarship></ManageScholarship>
        },
        {
          path:'manageUser',
          element:<ManageUsers></ManageUsers>
        },
        {
          path:'manageReview',
          element:<ManageReview></ManageReview>
        },
        {
          path:'allAppliedScholarship',
          element:<AllAppliedScholarship></AllAppliedScholarship>
        },
        {
          path:'allReview',
          element:<AllReview></AllReview>
        },
       
  
        // moderator routes

      ]
    }
  ]);