import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useEffect, useState } from "react";

const Profile = () => {
    const axiosPublic= useAxiosPublic();
    const { user }= useAuth();
    console.log('user', user)
    const {data:loggedUser=[]}=useQuery({
        queryKey:['email'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user.email}`)
            console.log(res.data)
            return res.data[0];
        }
    })
  
    return (
        <div>
        <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} />
            </div>
        </div>
        <h2>Name:{user.displayName}</h2>
        <h2>Role:{loggedUser?.role}</h2>
    </div>
    );
};

export default Profile;