import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn,githubSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = ()=>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                role: 'user'
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
    const handleGithubLogin = ()=>{
        githubSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                role: 'user'
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleLogin} className="btn"><FaGoogle></FaGoogle></button>
                <button onClick={handleGithubLogin} className="btn"><FaGithub></FaGithub></button>
            </div>
        </div>
    );
};

export default SocialLogin;