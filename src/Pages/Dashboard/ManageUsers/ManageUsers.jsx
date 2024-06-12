import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [filterRole, setFilterRole] = useState("");


    const { data: users=[], refetch }=useQuery({
        queryKey:['users', filterRole],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/users');
            if (filterRole) {
                return res.data.filter(u => u.role === filterRole);
            }
            return res.data;
        }
    })
    const handleRole=(userId, newRole)=>{
        const info={
            id: userId,
            role: newRole
        }
        Swal.fire({
            title: `Are you sure to make ${newRole} ?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, make ${newRole}!`
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch('/users',info)
                .then(res =>{
                    console.log(res.data)
                    if(res.data. modifiedCount>0){
                        Swal.fire({
                            title: "Congrats",
                            text: `Role changed to ${newRole} successfully`,
                            icon: "success"
                          });
                          refetch();
                    }
                })
              
            }
          });
    }

    const handleDelete =(userId)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${userId}`)
                .then(res =>{
                    console.log(res.data)
                    if(res.data.deletedCount>0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                          });
                          refetch();
                    }
                })
              
            }
          });
    }
    return (
        <div className="overflow-x-auto">
            <div className="flex justify-end mb-4">
                <select 
                    value={filterRole} 
                    onChange={(e) => setFilterRole(e.target.value)} 
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="user">User</option>
                </select>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user,index) =><tr key={user._id} className="bg-base-200">
                        <th>{index+1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <select defaultValue={user.role} onChange={(e)=>handleRole(user._id, e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </td>
                        <td> <button onClick={()=>handleDelete(user._id)}><FaTrash className="text-red-400 text-3xl"></FaTrash></button> </td>
                </tr>)
                }
                    
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;