// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useAdmin = () => {
//     const { user, loading } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const { data: isAdmin, isPending: isAdminLoading } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         enabled: user && !loading,
//         queryFn: async()=>{
//             console.log('loading',loading)
//             console.log('asking or checking is admin', user)
//             const res = await axiosSecure.get(`/users/${user.email}`);
//             // console.log(res.data)
//             return res.data?.role
//         }
//     })
//     return [isAdmin, isAdminLoading]
// };

// export default useAdmin;