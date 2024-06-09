import { useEffect, useState } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";

const AllScholarship = () => {
    const [scholarships, setScholarships]=useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(()=>{
        axiosPublic.get('/scholarships')
        .then(res =>{
            setScholarships(res.data)
        })
    },[])
    
    return (
        <div>
            <h2 className="text-3xl text-center mb-5">Available Scholarships </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    scholarships.map(scholarship => <ScholarshipCard key={scholarship._id} scholarship={scholarship}></ScholarshipCard>)
                }
            </div>
        </div>
    );
};

export default AllScholarship;