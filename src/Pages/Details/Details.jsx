import { Link, useLoaderData } from "react-router-dom";

const Details = () => {
    const scholarship = useLoaderData();
    const { _id,scholarship_name,university_name,university_image,university_country,
        university_world_rank,subject_category,scholarship_category,degree,tuition_fees,
        application_fees,service_charge,application_deadline,scholarship_post_date,posted_user_email } = scholarship;

    return (
        <div className="md:w-1/2 mx-auto mb-10">
            <img className="w-full" src={university_image} alt="Shoes" />
            <div>
                <h2>{scholarship_name}</h2>
                <div className="flex gap-8">
                    <div>
                        <p><strong>University:</strong>{university_name}</p>
                        <p><strong>Country:</strong>{university_country}</p>
                        <p><strong>Rank:</strong>{university_world_rank}</p>
                        <p><strong>Subject:</strong>{subject_category}</p>
                        <p><strong>Category:</strong>{scholarship_category}</p>
                        <p><strong>Degree:</strong>{degree}</p>
                    </div>
                    <div>
                        <p><strong>Tuition Fees:</strong>${tuition_fees}</p>
                        <p><strong>Application Fees:</strong>${application_fees}</p>
                        <p><strong>Service Charge:</strong>${service_charge}</p>
                        <p><strong>Deadline:</strong>{application_deadline}</p>
                        <p><strong>Post Date:</strong>{scholarship_post_date}</p>
                    </div>
                </div>
               
                <div className="text-center mt-4">
                    <Link to={`/payment/${_id}`} state={{scholarship}}><button className="btn btn-secondary btn-sm px-5">Apply Scholarship</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Details;