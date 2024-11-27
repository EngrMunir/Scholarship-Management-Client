import { useEffect, useState } from "react";

const SuccessStories = () => {
    const [stories, setStories] = useState([]);

    useEffect(()=>{
        fetch('data')
        .then(res => res.json())
        .then(data => setStories(data))
    },[])
    return (
        <section>
            <h2 className="text-3xl font-bold text-center">Success Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-6">
                {
                    stories.map((story,index)=>(
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                            <img src={story.image} alt={story.name} className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-2">{story.name}</h3>
                            <p className="text-sm text-gray-600">{story.scholarshipName}</p>
                            <p className="mt-2">{story.story.substring(0,100)}......</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default SuccessStories;