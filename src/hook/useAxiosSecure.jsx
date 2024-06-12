import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://scholarship-management-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;