import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

const UserApplication = () => {
    const axiosSecure = useAxiosSecure();
    const { user } =useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedApplied, setSelectedApplied]= useState(null)

    const { data: myApplied=[],refetch }=useQuery({
        queryKey:['applied'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/applied-scholarship?email=${user.email}`)
            return res.data;
        }
    })

    const handleReview =(applied)=>{
        console.log(applied)
        setSelectedApplied(applied)
        document.getElementById('my_modal_5').showModal()
    }

    const handleCancel = (cancelId)=>{
      
       console.log(cancelId)

       const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Cancel it!",
        cancelButtonText: "No!",
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
            const cancelRes= await axiosSecure.delete(`/applied-scholarships/${cancelId}`)
            if(cancelRes.data. deletedCount>0){
                refetch()
                swalWithBootstrapButtons.fire({
                    title: "Cancelled!",
                    text: "Your Application has been cancelled.",
                    icon: "success"
                  });
            }
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
    }

    const onSubmit=async(data)=>{
        const date = new Date();
        const formattedDate= format(date, 'yyyy-MM-dd');
        console.log(data)
        const reviewInfo = {
            review_point: data.rating,
            review_comment: data.comment,
            review_date: formattedDate,
            scholarship_name: selectedApplied.scholarship_name,
            university_name: selectedApplied.university_name,
            scholarship_id:selectedApplied.scholarship_id, 
            reviewer_name:selectedApplied.user_name,
            reviewer_email: selectedApplied.user_email
        }

        console.log(reviewInfo)
        const reviewRes =await axiosSecure.post('/review',reviewInfo)
        console.log('review res', reviewRes.data)
        if(reviewRes.data.insertedId){
            Swal.fire({
                title: "Good job!",
                text: "You added review",
                icon: "success"
              });
        }
    }
    return (
        <div>
            <h2>User Application:{myApplied.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>University Name</th>
        <th>Address</th>
        <th>Feedback</th>
        <th>Category</th>
        <th>Degree</th>
        <th>Application Fees</th>
        <th>Service Charge</th>
        <th>Status</th>
        <th>Action</th>
        <th>Review</th>
      </tr>
    </thead>
    <tbody>
      {
        myApplied.map(applied => <tr key={applied._id}>
            <th>{applied.university_name}</th>
            <td>Address</td>
            <td>feedback</td>
            <td>{applied.subject_category}</td>
            <td>degree</td>
            <td>app fee</td>
            <td>service</td>
            <td>{applied.status}</td>
            <td>
                <Link to={`/details/${applied.scholarship_id}`}><button>Details</button></Link>
                <Link to={`/update/${applied._id}`}><button>Edit</button></Link>
                <button onClick={()=>handleCancel(applied._id)}>Cancel</button>
            </td>
            <td>
                <button onClick={()=>handleReview(applied)}>Review</button>
            </td>
          </tr>)
    }     
    </tbody>
  </table>
</div>
{/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Rating point" type="number" {...register('rating')} className="border py-2 px-4 mb-4" /><br />
        <input  placeholder="Review Comment" type="text" {...register('comment')} className="border py-2 px-4 mb-4" /> <br />
        <input className="btn" type="submit" value="Add Review" />
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

export default UserApplication;