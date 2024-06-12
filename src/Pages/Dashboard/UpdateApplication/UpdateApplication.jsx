import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { format } from "date-fns";


// const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_key= '074e1aaa95a4c9e95ebbcc605e6e1ef9';

const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateApplication = () => {
    const [item]= useLoaderData();
    const axiosSecure= useAxiosSecure();
    const axiosPublic= useAxiosPublic()
    const { register, handleSubmit } = useForm();
    console.log('updated page ',item);
    const { _id, applicant_phone_number,applicant_photo,application_deadline,applicant_address,applicant_gender,
        applicant_applying_degree,application_fees,service_charge,ssc_result,hsc_result,
        study_gap,university_name,scholarship_name,scholarship_category,subject_category,
        user_name,user_email,scholarship_id,current_date,status }=item;

    const onSubmit =async(data)=>{
 // console.log(data);
        // image upload to image bb and then get an url
        const imageFile = { image: data.image[0] }
        console.log('image file ', imageFile)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers:{
                'content-type':'multipart/form-data'
            }
        });

        console.log('hosting bb res ',res.data)
        if(res.data.success){
            const date = new Date();
            const formattedDate= format(date, 'yyyy-MM-dd');
            // now send the applied scholarship data to the server with imagebb url
            const applied_scholarship ={
                applicant_phone_number:data.phone,
                applicant_photo: res.data?.data.display_url,
                applicant_address:data.address,
                applicant_gender: data.gender,
                applicant_applying_degree: data.degree,
                application_fees:application_fees,
                application_deadline:application_deadline,
                sevice_charge:service_charge,
                ssc_result: parseFloat(data.ssc),
                hsc_result: parseFloat(data.hsc),
                study_gap: data.study_gap ,
                university_name: data.university_name,
                scholarship_name:scholarship_name,
                scholarship_category: data.scholarship_category,
                subject_category: data.subject_category,
                user_name: user_name,
                user_email: user_email,
                scholarship_id: scholarship_id,
                applied_date: formattedDate, //convert utc
                status:'pending',
                applicationId:_id
            }
            
            const appliedScholarshipRes= await axiosSecure.post('/applied-scholarships', applied_scholarship)
            console.log(appliedScholarshipRes)
            if(appliedScholarshipRes.data.insertedId){
                // show success popup
                Swal.fire({
                    title: "Congratulations!",
                    text: "Your application updated Successfully!",
                    icon: "success"
                  });
            }
        }
    }
    return (
        <div>
        <div className="mx-auto md:w-3/4">
           <h2 className="text-3xl mb-6 text-center">Please Provide Authentic Info</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between mb-5">
                   <div>
                       {/* left side */}
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Phone Number</span>
                           </div>
                           <input type="text" {...register('phone')} defaultValue={applicant_phone_number} className="input input-bordered w-full max-w-xs" />
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Photo</span>
                           </div>
                           <input {...register('image',{required:true})} type="file" className="file-input w-full max-w-xs" />
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Address</span>
                           </div>
                           <input type="text" {...register('address')} defaultValue={applicant_address} className="input input-bordered w-full max-w-xs" />
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Gender</span>
                           </div>
                           <select defaultValue={applicant_gender} className="select select-bordered w-full" {...register('gender')} >
                               <option disabled value={applicant_gender}>{applicant_gender}</option>
                               <option value="Male">Male</option>
                               <option value="Female">Female</option>
                           </select>
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Degree</span>
                           </div>
                           <select defaultValue={applicant_applying_degree} className="select select-bordered w-full" {...register('degree')} >
                               <option disabled value={applicant_applying_degree}>{applicant_applying_degree}</option>
                               <option value="Diploma">Diploma</option>
                               <option value="Bachelors">Bachelors</option>
                               <option value="Masters">Masters</option>
                           </select>
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">SSC Grade</span>
                           </div>
                           <input type="text" {...register('ssc')} defaultValue={ssc_result} className="input input-bordered w-full max-w-xs" />
                       </div>
                   </div>
                   <div>
                      {/* right side */}
                      <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">HSC Grade</span>
                           </div>
                           <input type="text" {...register('hsc')} defaultValue={hsc_result} className="input input-bordered w-full max-w-xs" />
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Study Gap</span>
                           </div>
                           <select defaultValue={study_gap} {...register('study_gap')} className="select select-bordered w-full" >
                               <option disabled value={study_gap}>{study_gap}</option>
                               <option value="No Gap">No Gap</option>
                               <option value="Less than 1 year">Less than 1 year</option>
                               <option value="One to two years">1-2 years</option>
                               <option value="Two to three years">2-3 years</option>
                               <option value="Three to four years">3-4 years</option>
                               <option value="More than 4 years">More than 4 years</option>
                           </select>
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">University Name</span>
                           </div>
                           <input type="text" {...register('university_name')} defaultValue={university_name} readOnly className="input input-bordered w-full max-w-xs" />
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Scholarship Category</span>
                           </div>
                           <input type="text" readOnly defaultValue={scholarship_category} {...register('scholarship_category')} className="input input-bordered w-full max-w-xs" />
                       </div>
                       <div className="form-control w-full max-w-xs">
                           <div className="label">
                               <span className="label-text">Subject Category</span>
                           </div>
                           <input type="text" readOnly defaultValue={subject_category} {...register('subject_category')} className="input input-bordered w-full max-w-xs" />
                       </div>
                   </div>
               </div>
               
               <input className="btn btn-secondary w-full mb-4" type="submit" value="Apply" />
           </form>
       </div>  
      </div>
    );
};

export default UpdateApplication;