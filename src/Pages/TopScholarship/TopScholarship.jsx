import { useEffect, useState } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import TopCard from "./TopCard";
import { Link } from "react-router-dom";

const TopScholarship = () => {
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
        <h2 className="text-3xl text-center mb-5">Top Scholarships </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {
                scholarships.slice(0,6).map(scholarship => <TopCard key={scholarship._id} topScholarship={scholarship}></TopCard> )
            }
        </div>
        <div className="text-center mt-5">
            <Link to='/scholarships'><button className="btn btn-secondary btn-sm px-5">Show All</button></Link>
        </div>
    </div>
    );
};

export default TopScholarship;