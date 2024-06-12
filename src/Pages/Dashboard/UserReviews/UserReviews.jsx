import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";




const UserReviews = () => {
    const axiosSecure= useAxiosSecure();
    const { user } = useAuth();
    const [item, setItem]=useState(null)
    const { register, handleSubmit } = useForm();
    const [itemId, setItemId]=useState(null)

    const {data: reviews=[], refetch}= useQuery({
        queryKey:['review'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/review?email=${user?.email}`)
            return res.data;
        }
    })

    const handleDelete =(id)=>{
        // console.log('receive ', id)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/review/${id}`)
            console.log(res.data)
            if(res.data.deletedCount){
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
          }           
          }
        });
       
       
    }
    const handleEdit=async(id)=>{
        const res = await axiosSecure.get(`/review/${id}`)
        setItemId(id);
        setItem(res.data[0]);
        // console.log('data for update',res.data[0])
        document.getElementById('my_modal_5').showModal()        
    }

    const onSubmit=async(data)=>{
        const date = new Date();
        const formattedDate= format(date, 'yyyy-MM-dd');
        // console.log(data)
        const reviewInfo = {
            review_point: data.rating,
            review_comment: data.comment,
            review_date: formattedDate,
            scholarship_name: item.scholarship_name,
            university_name: item.university_name,
            scholarship_id:item.scholarship_id, 
            reviewer_name:item.reviewer_name,
            reviewer_email: item.reviewer_email,
            review_id: itemId
        }

        const res = await axiosSecure.patch('/review',reviewInfo)
        console.log(res.data)
        if(res.data.modifiedCount){
            Swal.fire("updated")
        }
    }
    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Scholarship Name</th>
        <th>University Name</th>
        <th>Review Comments</th>
        <th>Review Date</th>
        <th>Delete</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      {
        reviews.map(review =><tr key={review._id}>
            <td>{review.scholarship_name}</td>
            <td>{review.university_name}</td>
            <td>{review.review_comment}</td>
            <td>{review.review_date}</td>
            <td> 
                <button onClick={()=>handleDelete(review._id)}><FaTrash /></button>
            </td>
            <td>
               <button onClick={()=>handleEdit(review._id)}> <FaEdit /></button>
            </td>
          </tr>)
      }
      
    </tbody>
  </table>
  {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>}>open modal</button> */}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={item?.review_point} type="number" {...register('rating')} className="border py-2 px-4 mb-4" /><br />
        <input defaultValue={item?.review_comment} type="text" {...register('comment')} className="border py-2 px-4 mb-4" /> <br />
        <input className="btn" type="submit" value="Update Review" />
    </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
    );
};

export default UserReviews;