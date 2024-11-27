import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://scholarship-management-server-one.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;