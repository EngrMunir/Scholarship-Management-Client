import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAxiosPublic from "../hook/useAxiosPublic";
import useAuth from "../hook/useAuth";
import { FaHome, FaRegAddressCard, FaUsers } from "react-icons/fa";
import { MdOutlineReviews,  MdOutlineSettingsApplications } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";




const Dashboard = () => {
    const axiosPublic=useAxiosPublic();
    const {user, loading }=useAuth();
    if(loading){
        return <p>Loading....</p>
    }
    console.log(user?.email);
    const {data:loggedUser=[]}=useQuery({
        queryKey:['email'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user.email}`)
            console.log(res.data)
            return res.data[0];
        }
    })

    console.log(loggedUser.role)

    // const role = loggedUser.role;
    const role = "admin";
    return (
        <div className="flex">
            {/* sidebar */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu p-4">
                    {
                        role ==='admin' &&
                        (
                            <>
                                <li><NavLink to="/dashboard/profile"><CgProfile />My Profile</NavLink></li>
                                <li><NavLink to="/dashboard/addScholarship"><FaRegAddressCard />Add Scholarship</NavLink></li>
                                <li><NavLink to="/dashboard/manageScholarship"><IoSchool />Manage Scholarship</NavLink></li>
                                <li><NavLink to="/dashboard/allAppliedScholarship"><IoSchool />Manage Applied Scholarship</NavLink></li>
                                <li><NavLink to="/dashboard/manageUser"><FaUsers />Manage Users</NavLink></li>
                                <li><NavLink to="/dashboard/allReview"><MdOutlineReviews />Manage Reviews</NavLink></li>
                        </>
                        )
                    }
                    {
                        role ==='moderator' &&
                        (
                            <>
                            <li><NavLink to="/dashboard/profile"><CgProfile />My Profile</NavLink></li>
                            <li><NavLink to="/dashboard/manageScholarship"><IoSchool />Manage Scholarship</NavLink></li>
                            <li><NavLink to="/dashboard/allReview"><MdOutlineReviews />All Reviews</NavLink></li>
                            <li><NavLink to="/dashboard/allAppliedScholarship"><IoSchool />All Applied Scholarship</NavLink></li>
                            <li><NavLink to="/dashboard/addScholarship"><FaRegAddressCard />Add Scholarship</NavLink></li>
                            </>
                        )
                    }
                    {
                        role ==='user'&& 
                        (
                            <>
                              <li><NavLink to="/dashboard/profile"><CgProfile />My Profile</NavLink></li>
                              <li><NavLink to="/dashboard/userApplication"><MdOutlineSettingsApplications />         My Application</NavLink></li>
                              <li><NavLink to="/dashboard/userReviews"><MdOutlineReviews />My Review</NavLink></li>
                            </>
                        )
                    }
                     <div className="divider"></div> 
                     <li><Link to="/"><FaHome />Home</Link> </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;