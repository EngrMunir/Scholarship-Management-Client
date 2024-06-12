import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import useAuth from "../../../hook/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = ()=>{
        logOut()
    }
    const navlinks =
    <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/scholarships">All ScholarShip</NavLink></li>
        <li><NavLink to="/dashboard/profile">Dashboard</NavLink></li>
       
       {
        user? <>
            <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
        </>:
        <>
             <li><NavLink to="/login">Login</NavLink></li>
        </>
       }
       
        
    </>
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navlinks}
            </ul>
          </div>
            <img className="w-20 h-20" src={logo} alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user ? 
            <>
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img title={user?.displayName} src={user?.photoURL} />
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
            </>
            :
            <>
              <Link to="/login"><button className="btn btn-ghost btn-sm">Login</button></Link>
            </>
          }
        </div>
      </div>
    );
};

export default Navbar;