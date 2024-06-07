import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app from "../../firebase/firebase.config";
import { AuthContext } from "../../Providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import logo from "../../assets/logo.jpg";

const Login = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn }= useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data =>{
     const email = data.email;
     const password = data.password;
    
     signIn(email, password)
     .then( result =>{
        const user = result.user;
        console.log(user);
        navigate('/')
        Swal.fire({
            title: "User LoggedIn Successfully",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
     })
     .catch(error =>{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid email and password",
            
          });
     })

    }

    const handleGoogleLogin =()=>{
      console.log('google button clicked')
      signInWithPopup(auth, googleProvider)
      .then(result =>   {
        const user = result?.user?.email;
        console.log(user)
        navigate('/')
        Swal.fire({
            title: "User LoggedIn Successfully by Google",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
      })
      .catch(error =>{
        console.log(error.message)
      })
    }
  
    const handleGithubSignIn = ()=>{
      signInWithPopup(auth, githubProvider)
      .then( result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        navigate('/')
        Swal.fire({
            title: "User LoggedIn Successfully by github",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
      })
      .catch( error =>{
        console.log(error)
      })
    }

    return (
        <div>
        <div className="mx-auto md:w-1/2">
        <div className="flex justify-center">
                <img className="text-center w-20 h-20" src={logo} alt="" />
            </div>
           <h2 className="text-3xl mb-6 text-center">Please Login</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
              
               <input type="email" placeholder="Email" {...register('email', {required:true})} className="border w-full py-2 px-4 mb-4" />
               {
                    errors.email && <span className="text-red-500">Email is required</span>
                }
               <br />
               <input type="password" placeholder="Password" {...register('password',{required:true})} className="border w-full py-2 px-4 mb-4" />
               {
                    errors.password && <span className="text-red-500">Password is required</span>
                }
               <br />
               <input className="btn btn-secondary w-full mb-4" type="submit" value="Login" />
           </form>
           <div className="flex gap-3 justify-center mb-5">
                <button className="text-3xl" onClick={handleGoogleLogin}><FcGoogle /></button>
                <button className="text-3xl" onClick={handleGithubSignIn}><GrGithub /></button>
            </div>
           <p className="text-center mb-5">New here? Please <Link className="text-blue-500" to="/register">Register</Link> </p>
       </div>  
      </div>   
    );
};

export default Login;