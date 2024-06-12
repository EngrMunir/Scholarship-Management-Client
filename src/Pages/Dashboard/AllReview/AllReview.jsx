import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const AllReview = () => {
    const axiosSecure =useAxiosSecure();

    const { data:reviews=[], refetch, } = useQuery({
        queryKey:['review'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/review');
            return res.data;
        }
    })

    const handleDelete=async(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axiosSecure.delete(`/review/${id}`);
          if(res.data.deletedCount>0){
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
        }
         
        }
      });
        
        
    }
    return (
        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Reviewed University Name</th>
              <th>Reviewer Name</th>
              <th>Review Date</th>
              <th>Rating Point</th>
              <th>Reviewer Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                reviews.map(review =><tr key={review._id}>
                    <td>{review.university_name}</td>
                    <td>{review.reviewer_name}</td>
                    <td>{review.review_date}</td>
                    <td>{review.review_point}</td>
                    <td>{review.review_comment}</td>
                    <td>
                        <button onClick={()=>handleDelete(review._id)}><FaTrash></FaTrash></button>
                    </td>
                  </tr>)
            }
            
          </tbody>
        </table>
      </div>
    );
};

export default AllReview;