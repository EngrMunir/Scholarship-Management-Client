import { useEffect, useState } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import ScholarshipCard from "../ScholarshipCard/ScholarshipCard";
import './Scholarship.css';
import useScholarships from "../../hook/useScholarships";

const AllScholarship = () => {
    const [scholarships, setScholarships]=useState([]);
    const axiosPublic = useAxiosPublic();
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsPerPage, setItemsPerPage]=useState(6);
    const [currentPage, setCurrentPage] =useState(0);
    const count = useScholarships().length;
    console.log('count',count)
    // const count = filteredScholarships.length;
    const numberOfPages = Math.ceil(count/ itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    useEffect(()=>{
        axiosPublic.get(`/scholarships?page=${currentPage}&size=${itemsPerPage}`)
        .then(res =>{
            setScholarships(res.data)
            setFilteredScholarships(res.data)
        })
    },[currentPage,itemsPerPage])

    const handleSearch = () => {
        const term = searchTerm.toLowerCase();
        const filtered = scholarships.filter(scholarship => 
            scholarship.scholarship_name.toLowerCase().includes(term) ||
            scholarship.university_name.toLowerCase().includes(term) ||
            scholarship.degree.toLowerCase().includes(term)
        );
        setFilteredScholarships(filtered);
    };

    const handleItemsPerPage = e =>{
        const val = parseInt(e.target.value);
        console.log(val)
        setItemsPerPage(val)
        setCurrentPage(0);
    }
    
    const handlePrevPage=()=>{
        if(currentPage>0){
            setCurrentPage(currentPage-1)
        }
    }

    const handleNextPage = ()=>{
        if(currentPage < pages.length-1){
            setCurrentPage(currentPage + 1);
        }
    }
    return (
        <div>
            <h2 className="text-3xl text-center mb-5">Available Scholarships </h2>
            <div className="flex justify-center mb-5">
                <input 
                    type="text" 
                    className="border p-2 mr-2"
                    placeholder="Search by Scholarship, University, or Degree"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                    className="bg-blue-500 text-white p-2"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    filteredScholarships.map(scholarship => <ScholarshipCard key={scholarship._id} scholarship={scholarship}></ScholarshipCard>)
                }
            </div>
            <div className="pagination">
                <p>Current Page:{currentPage}</p>
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page =><button
                    className={currentPage === page ? 'selected':undefined} 
                    onClick={()=>setCurrentPage(page)} 
                    key={page}>{page}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default AllScholarship;