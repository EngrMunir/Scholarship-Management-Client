import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


const AllAppliedScholarship = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedId, setSelectedId]= useState(null);
    const { register, handleSubmit } = useForm();
    const [sortCriteria, setSortCriteria] = useState("");

    const { data: appliedScholarships =[], refetch } = useQuery({
        queryKey:['allApplied'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/applied-scholarship')
            return res.data;
        }
    })
    console.log(appliedScholarships)


    const sortedScholarships = [...appliedScholarships].sort((a, b) => {
      if (sortCriteria === 'appliedDate') {
          return new Date(a.applied_date) - new Date(b.applied_date);
      } else if (sortCriteria === 'scholarshipDeadline') {
          return new Date(a.application_deadline) - new Date(b.application_deadline);
      }
      return 0;
  });


    const handleCancel=async(id)=>{
      console.log(id)
      const cancelInfo = {
        appliedId: id,
        status: 'rejected'
      }
      const res = await axiosSecure.patch('/applied-scholarships/cancel',cancelInfo)
      if(res.data.modifiedCount){
        refetch()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application has been rejected",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    const handleFeedback =async(id)=>{
      setSelectedId(id);
      document.getElementById('my_modal_5').showModal();
    }

    const onSubmit=async(data)=>{
      const feedbackInfo = {
        appliedId:selectedId,
        feedback:data.feedback
      }
      const feedbackRes= await axiosSecure.patch('/applied-scholarships',feedbackInfo)
      // console.log(feedbackRes.data)
      if(feedbackRes.data.modifiedCount>0){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Feedback has been added",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

    return (
        <div>
            <h2>All Applied Scholarship: {appliedScholarships.length}</h2>
            <div className="flex justify-center mb-4">
                <select
                value={sortCriteria}
                onChange={(e)=>setSortCriteria(e.target.value)}
                className="select select-bordered w-full max-w-xs"
                >
                  <option value="">Sort By</option>
                  <option value="appliedDate">Applied Date</option>
                  <option value="scholarshipDeadline">Scholarship Deadline</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
         <thead>
      <tr>
        <th>University Name</th>
        <th>Scholarship Name</th>
        <th>Scholarship Category</th>
        <th>Subject Category</th>
        <th>Degree</th>
        <th>Application Fees</th>
        <th>Service Charge</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { 
        sortedScholarships.map(applied =><tr key={applied._id}>
            <th>{applied.university_name}</th>
            <td>{applied.scholarship_name}</td>
            <td>{applied.scholarship_category}</td>
            <td>{applied.subject_category}</td>
            <th>{applied.applicant_applying_degree}</th>
            <td>{applied.application_fees}</td>
            <td>{applied.service_charge}</td>
            <td>{applied.status}</td>
            <td>
              <Link to={`/appliedDetails/${applied._id}`}> <button className="btn btn-sm">Details</button></Link>
              <button onClick={()=>handleFeedback(applied._id)} className="btn btn-sm">Feedback</button>
              <button onClick={()=>handleCancel(applied._id)} className="btn btn-sm">Cancel</button>
            </td>
          </tr>)
      
      }
    </tbody>
  </table>
</div>
{/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>}>open modal</button> */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input className="border w-3/4" {...register('feedback')} placeholder="Enter feedback" type="text" />
      <input className="btn btn-secondary btn-sm ml-3" type="submit" value="Submit" />
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

export default AllAppliedScholarship;