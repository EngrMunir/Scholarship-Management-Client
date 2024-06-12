import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useScholarships = () => {
    const [scholarships, setScholarships]=useState([])
    const axiosPublic=useAxiosPublic();
    useEffect(()=>{
        axiosPublic.get('/scholarships')
        .then(res =>{
            setScholarships(res.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[axiosPublic])

    return scholarships; 
};

export default useScholarships;