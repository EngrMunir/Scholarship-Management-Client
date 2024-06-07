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
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import UserApplication from "../Pages/Dashboard/UserApplication/UserApplication";
import UserReviews from "../Pages/Dashboard/UserReviews/UserReviews";
import AddScholarship from "../Pages/Dashboard/AddScholarShip/AddScholarship";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageScholarship from "../Pages/Dashboard/ManageScholarship/ManageScholarship";
import ManageAppliedScholarship from "../Pages/Dashboard/ManageAppliedScholarship/ManageAppliedScholarship";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageReview from "../Pages/Dashboard/ManageReview/ManageReview";
import AllAppliedScholarship from "../Pages/Dashboard/AllAppliedScholarship/AllAppliedScholarship";


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
          loader:({params})=>fetch(http://localhost:5000/scholarship/${params.id})
        },
        {
          path:'/payment/:id',
          element:<Payment></Payment>
        }
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        // normal user routes
        {
          path:'userProfile',
          element:<UserProfile></UserProfile>          
        },
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
          path:'adminProfile',
          element:<AdminProfile></AdminProfile>
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
          path:'manageAppliedScholarship',
          element:<ManageAppliedScholarship></ManageAppliedScholarship>
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
        }
  
        // moderator routes

      ]
    }
  ]);