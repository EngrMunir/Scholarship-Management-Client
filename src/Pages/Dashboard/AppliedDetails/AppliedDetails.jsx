import { useLoaderData } from "react-router-dom";

const AppliedDetails = () => {
    const item = useLoaderData();
    console.log(item[0])
    const {applicant_address,applicant_applying_degree,applicant_gender,
        applicant_phone_number,applicant_photo, applicationId,
         application_fees, current_date, hsc_result,scholarship_category, 
         scholarship_id, scholarship_name,ssc_result, status, study_gap,
          subject_category,university_name, user_email, user_name}=item[0];
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={applicant_photo} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{university_name}</h2>
          <p><strong>Applied Degree:</strong>{applicant_applying_degree}</p>
          <p><strong>Scholarship Category:</strong>{scholarship_category}</p>
          
        </div>
      </div>
    );
};

export default AppliedDetails;