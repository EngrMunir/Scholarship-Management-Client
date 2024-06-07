import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import logo from "../../assets/logo.jpg";
import useAxiosPublic from "../../hook/useAxiosPublic";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const onSubmit = data =>{
        const email = data.email;
        const password = data.password;

        console.log(data)

        createUser(email, password)
        .then(res =>{
            const loggedUser = res.user;
            console.log('user created successfully', loggedUser)
            updateUserProfile(data.name, data.photo)
            .then(()=>{
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('User added to the database')
                        reset()
                        Swal.fire({
                            position: 'center',
                            icon:'success',
                            title:"User created successfully",
                            showConfirmButton:false,
                            timer:1500
                        })
                    }
                })
            })
            navigate('/')

        })
    }

    return (
        <div>
        <div className="mx-auto md:w-1/2">
            <div className="flex justify-center">
                <img className="text-center w-20 h-20" src={logo} alt="" />
            </div>
           <h2 className="text-3xl mb-6 text-center">Please Register</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Your Name" {...register('name', {required: true})} className="border w-full mb-4 py-2 px-4" />
                    {
                        errors.name && <span className="text-red-500">Name is required</span>
                    }
                    <br />
                    <input type="text" placeholder="Photo URL" {...register('photo', {required:true})} className="border w-full py-2 px-4 mb-4" />
                    {
                        errors.photo && <span className="text-red-500">Photo URL is required</span>
                    }
                    <br />
                    <input type="email" placeholder="Email" {...register('email', {required:true})} className="border w-full py-2 px-4 mb-4" />
                    {
                        errors.email && <span className="text-red-500">Email is required</span>
                    }
                    <br />
                    <input type="password" placeholder="Password" {...register('password',{required:true, minLength:6, pattern:/(?=.[A-Z])(?=.[a-z])/})} className="border w-full py-2 px-4 mb-4" />
                        {
                            errors.password?.type === 'required' && <p className="text-red-500">Password must be required</p>
                        }
                        {
                            errors.password?.type ==='minLength' && <p className="text-red-500">Password must be at least six character</p>
                        }
                        {
                            errors.password?.type ==='pattern' && <p className="text-red-500">Password must be at least one upper case , one lower case</p>
                        }
                    <br />
                    <input className="btn btn-secondary w-full mb-4" type="submit" value="Register" />
                </form>
           <p className="text-center mb-5">Already registered? Please <Link className="text-blue-500" to="/login">Login</Link> </p>
       </div>  
      </div>   
    );
};

export default Register;