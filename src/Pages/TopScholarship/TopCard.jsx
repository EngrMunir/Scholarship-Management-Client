
const TopCard = ({topScholarship}) => {
    const { _id, university_name, university_image, university_country, 
        subject_category, scholarship_category,application_fees,
        application_deadline } = topScholarship;
    return (
        <div className="card bg-base-100 shadow-xl">
        <figure><img src={university_image} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{university_name}</h2>
            <p><strong>Country:</strong>{university_country}</p>
            <p><strong>Subject Category:</strong>{subject_category}</p>
            <p><strong>Scholarship Category:</strong>{scholarship_category}</p>
            <p><strong>Application Fees:</strong>${application_fees}</p>
            <p><strong>Deadline:</strong>{application_deadline}</p>
        </div>
    </div>
    );
};

export default TopCard;