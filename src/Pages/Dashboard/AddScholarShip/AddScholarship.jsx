import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";

const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddScholarship = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const onSubmit= async(data)=>{
        const imageFile = { image: data.university_image[0] }
        const res = await axiosSecure.post(image_hosting_api, imageFile, {
            headers:{
                'content-type':'multipart/form-data'
            }
        });

        // console.log(res.data)
        if(res.data.success){
            const date = new Date();
            const formattedDate= format(date, 'yyyy-MM-dd');
            const scholarInfo = {
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
                university_image:res.data.data.display_url, 
                university_name:data.university_name, 
                university_world_rank:data.university_world_rank
            }
            console.log(scholarInfo)
            const scholarRes = await axiosSecure.post('/scholarships',scholarInfo)
            if(scholarRes.data.insertedId){
                Swal.fire({
                    title: "Congratulations!",
                    text: "Scholarship added Successfully!",
                    icon: "success"
                  });
            }
        }
        
    }

    return (
        <div className="bg-[#F4F3F0] p-24 mb-10">
        <h2 className='text-3xl text-center font-extrabold'>Add A Scholarship</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* scholarship name and university row */}
            <div className='md:flex gap-3 mb-8'>
                <div className='form-control md:w-1/2'>
                    <label className="label">
                        <span className='label-text'>Scholarship Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('scholarship_name', {required: true})} placeholder='Scholarship Name' className='input input-bordered w-full' />
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
                        <input type="text" {...register('university_name', { required: true })} placeholder='University Name' className='input input-bordered w-full' />
                        {
                            errors.university_name && <span className="text-red-500">University Name is required</span>
                        }
                    </label>
                </div>
            </div>
            {/* University Image and country row */}
            <div className='md:flex gap-3 mb-8'>
                
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">University Image</span>
                    </div>
                    <input {...register('university_image',{required:true})} type="file" className="file-input w-full max-w-xs" />
                </div>
                <div className='form-control md:w-1/2'>
                    <label className="label">
                        <span className='label-text'>University Country</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('university_country')} placeholder='University Country' className='input input-bordered w-full' />
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
                        <input type="text" {...register('university_city')} placeholder='University City' className='input input-bordered w-full' />
                    </label>
                </div>
                <div className='form-control md:w-1/2'>
                <label className="label">
                        <span className='label-text'>University World Rank</span>
                    </label>
                    <label className="input-group">
                        <input type="text" {...register('university_world_rank',{required: true})} placeholder='University World Rank' className='input input-bordered w-full' />
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
                        <select defaultValue="default"  {...register('subject_category',{required:true})} className="select select-bordered w-full" >
                            <option disabled value="default">Pick one</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                </div>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Scholarship Category</span>
                    </div>
                        <select defaultValue="default"  {...register('scholarship_category',{required:true})} className="select select-bordered w-full" >
                            <option disabled value="default">Pick one</option>
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
                        <select defaultValue="default"  {...register('degree',{required:true})} className="select select-bordered w-full" >
                            <option disabled value="default">Pick one</option>
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
                        <input type="number" {...register('tuition_fees')} placeholder='Tuition Fees' className='input input-bordered w-full' />   
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
                        <input type="number" {...register('application_fees')} placeholder='Application Fees' className='input input-bordered w-full' />   
                    </label>
                </div>
                <div className='form-control md:w-1/2'>
                <div className="label">
                        <span className="label-text">Service Charge</span>
                    </div>
                    <label className="input-group">
                        <input type="number" {...register('service_charge')} placeholder='Service Charge' className='input input-bordered w-full' />   
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
                        <input type="date" {...register('application_deadline')}  className='input input-bordered w-full' />   
                    </label>
                        
                </div>
                <div className='form-control md:w-1/2'>
                    <div className="label">
                        <span className="label-text">Posted User Email</span>
                    </div>
                    <label className="input-group">
                        <input type="text" {...register('posted_user_email')} defaultValue={user?.email} readOnly className='input input-bordered w-full' />   
                    </label>
                        
                </div>
            </div>
            {/* application deadline and scholarship post date */}
            <div className='md:flex gap-3 mb-8'>
                
            </div>
            <div className='text-center'>
            <input className="btn btn-secondary w-1/2 mb-2" type="submit" value="Add Scholarship" />
            </div>
        </form>

    </div>
    );
};

export default AddScholarship;