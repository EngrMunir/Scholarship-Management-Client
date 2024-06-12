import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { format } from "date-fns";

// const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;

// const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const ManageScholarship = () => {
    const axiosSecure = useAxiosSecure()
    const [selectedScholarship, setSelectedScholarship]=useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    // const [isModelOpen,setIsModelOpen]=useState(false)
    

    const { data: scholarships=[], refetch }= useQuery({
        queryKey:['scholarship'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/scholarships');
            return res.data;
        }
    })

    const onSubmit= async(data)=>{
        // const imageFile = { image: data.university_image[0] }
        // const res = await axiosSecure.post(image_hosting_api, imageFile, {
        //     headers:{
        //         'content-type':'multipart/form-data'
        //     }
        // });

        // console.log(res.data)
        // if(res.data.success){
            const date = new Date();
            const formattedDate= format(date, 'yyyy-MM-dd');
            const scholarInfo = {
                scholarshipId:selectedScholarship._id,
                application_deadline:data.application_deadline, 
                application_fees: parseInt(data.application_fees), 
                degree: data.degree,
                posted_user_email:user.email,
                scholarship_category:data.scholarship_category,
                scholarship_name:data.scholarship_name,
                scholarship_post_date: formattedDate,
                service_charge: parseInt(data.service_charge),
                subject_category:data.subject_category,
                tuition_fees:parseInt(data.tuition_fees),
                university_city:data.university_city, 
                university_country:data.university_country, 
                university_image:selectedScholarship.university_image, 
                university_name:data.university_name, 
                university_world_rank:data.university_world_rank
            }
            console.log(scholarInfo)
            const scholarRes = await axiosSecure.patch('/scholarships',scholarInfo)
            if(scholarRes.data.upsertedCount>0){
                Swal.fire({
                    title: "Congratulations!",
                    text: "Scholarship updated Successfully!",
                    icon: "success"
                  });
            }
            else{
                Swal.fire({
                    title: "Opps!",
                    text: "Scholarship update fail!",
                    icon: "error"
                  });
            }
        // }
        
    }


    const handleEdit=(scholarship)=>{
        setSelectedScholarship(scholarship);
        // setIsModelOpen(true);
        document.getElementById('my_modal_5').showModal();
    }

    const handleDelete = async(id)=>{
        const deleteRes= await axiosSecure.delete(`/scholarships/${id}`)
        // console.log('delete response ',deleteRes)
        if(deleteRes.data.deletedCount){
            refetch();
            Swal.fire({
                title: "Success",
                text: "You deleted scholarship",
                icon: "success"
              });
        }
    }

    // const closeModel =()=>{
    //     setIsModelOpen(false);
    //     setSelectedScholarship(null);
    //     document.getElementById('my_modal_5').showModal();
    // }

    return (
        <div>
            <h2 className="text-3xl text-center">Manage Scholarship: {scholarships.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Scholarship Name</th>
                            <th>University</th>
                            <th>Subject Category</th>
                            <th>Applied Degree</th>
                            <th>Application Fees</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            scholarships.map(scholarship =>  
                            <tr key={scholarship._id}>
                                <th>{scholarship.scholarship_name}</th>
                                 <td>{scholarship.university_name}</td>
                                <td>{scholarship.subject_category}</td>
                                <td>{scholarship.degree}</td>
                                <td>${scholarship.application_fees}</td>
                                <td>
                                    <Link to={`/details/${scholarship._id}`}><button className="btn btn-sm">Details</button></Link>
                                </td>
                                <td>
                                    <button><FaEdit onClick={()=>handleEdit(scholarship)} className="text-xl text-blue-400"></FaEdit></button>
                                </td>
                                <td><button onClick={()=>handleDelete(scholarship._id)}><FaTrash className="text-xl text-red-400"></FaTrash></button> </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    {
                        selectedScholarship && (
                            <div>
                                 <div className="bg-[#F4F3F0] p-24 mb-10">
                                    <h2 className='text-3xl text-center font-extrabold'>Update Scholarship</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* scholarship name and university row */}
                                        <div className='md:flex gap-3 mb-8'>
                                            <div className='form-control md:w-1/2'>
                                                <label className="label">
                                                    <span className='label-text'>Scholarship Name</span>
                                                </label>
                                                <label className="input-group">
                                                    <input type="text" {...register('scholarship_name', {required: true})} defaultValue={selectedScholarship.scholarship_name} className='input input-bordered w-full' />
                                                    {
                                                        errors.scholarship_name && <span className="text-red-500">Scholarship Name is required</span>
                                                    }
                                                </label>
                                            </div>
                <div className='form-control md:w-1/2'>
                    <label className="label">
                        <span className='label-text'>University Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('university_name', { required: true })} defaultValue={selectedScholarship.university_name} className='input input-bordered w-full' />
                        {
                            errors.university_name && <span className="text-red-500">University Name is required</span>
                        }
                    </label>
                </div>
            </div>
            {/* University Image and country row */}
            <div className='md:flex gap-3 mb-8'>
                
                {/* <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">University Image</span>
                    </div>
                    <input {...register('university_image',{required:true})} defaultValue={selectedScholarship.university_image} type="file" className="file-input w-full max-w-xs" />
                </div> */}
                <div className='form-control md:w-1/2'>
                    <label className="label">
                        <span className='label-text'>University Country</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('university_country')} defaultValue={selectedScholarship.university_country} className='input input-bordered w-full' />
                    </label>
                </div>
            </div>
            {/* city and rank row */}
            <div className='md:flex gap-3 mb-8'>
                <div className='form-control md:w-1/2'>
                <label className="label">
                        <span className='label-text'>University City</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('university_city')} defaultValue={selectedScholarship.university_city} className='input input-bordered w-full' />
                    </label>
                </div>
                <div className='form-control md:w-1/2'>
                <label className="label">
                        <span className='label-text'>University World Rank</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('university_world_rank',{required: true})} defaultValue={selectedScholarship.university_world_rank} className='input input-bordered w-full' />
                        {
                            errors.university_world_rank && <span className="text-red-500">University world rank is required</span>
                        }
                    </label>
                </div>
            </div>
            {/* subject category and scholarship category */}
            <div className='md:flex gap-3 mb-8'>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Subject Category</span>
                    </div>
                        <select defaultValue={selectedScholarship.subject_category}  {...register('subject_category',{required:true})} className="select select-bordered w-full" >
                            {/* <option disabled value="default">Pick one</option> */}
                            <option value="Agriculture">Agriculture</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                </div>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Scholarship Category</span>
                    </div>
                        <select defaultValue={selectedScholarship.scholarship_category}  {...register('scholarship_category',{required:true})} className="select select-bordered w-full" >
                            {/* <option disabled value="default">Pick one</option> */}
                            <option value="Full Fund">Full Fund</option>
                            <option value="Partial">Partial</option>
                            <option value="Self Fund">Self Fund</option>
                        </select>
                </div>
            </div>
            {/* degree and tuition_fees */}
            <div className='md:flex gap-3 mb-8'>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Degree</span>
                    </div>
                        <select defaultValue={selectedScholarship.degree}  {...register('degree',{required:true})} className="select select-bordered w-full" >
                            {/* <option disabled value="default">Pick one</option> */}
                            <option value="Diploma">Diploma</option>
                            <option value="Masters">Masters</option>
                            <option value="Bachelor">Bachelor</option>
                        </select>
                </div>
                <div className='form-control md:w-1/2'>
                    <label className="label">
                        <span className='label-text'>Tuition Fees</span>
                    </label>
                    <label className="input-group">
                        <input type="number" {...register('tuition_fees')} defaultValue={selectedScholarship.tuition_fees} className='input input-bordered w-full' />   
                    </label>
                </div>
            </div>
            {/* application_fees and service_charge */}
            <div className='md:flex gap-3 mb-8'>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Application Fees</span>
                    </div>
                    <label className="input-group">
                        <input type="number" {...register('application_fees')} defaultValue={selectedScholarship.application_fees} className='input input-bordered w-full' />   
                    </label>
                </div>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Service Charge</span>
                    </div>
                    <label className="input-group">
                        <input type="number" {...register('service_charge')} defaultValue={selectedScholarship.service_charge} className='input input-bordered w-full' />   
                    </label>
                </div>
            </div>
            {/* application deadline and scholarship post date */}
            <div className='md:flex gap-3 mb-8'>
                <div className='form-control md:w-1/2'>
                    <div className="label">
                        <span className="label-text">Application Deadline</span>
                    </div>
                    <label className="input-group">
                        <input type="date" {...register('application_deadline')} defaultValue={selectedScholarship.application_deadline}  className='input input-bordered w-full' />   
                    </label>
                        
                </div>
                <div className='form-control md:w-1/2'>
                    <div className="label">
                        <span className="label-text">Posted User Email</span>
                    </div>
                                         <label className="input-group">
                                                    <input type="text" {...register('posted_user_email')} defaultValue={selectedScholarship.posted_user_email} readOnly className='input input-bordered w-full' />   
                                                </label>                        
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <input className="btn btn-secondary w-1/2 mb-2" type="submit" value="Update Scholarship" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                    <div className="modal-action">
                        <form method="dialog">                            
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageScholarship;