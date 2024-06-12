import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { format } from "date-fns";

// const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_key= '074e1aaa95a4c9e95ebbcc605e6e1ef9';

const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const CheckoutForm = ({scholarship }) => {
    const axiosPublic = useAxiosPublic();
    const [error, setError ] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [show, setShow] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    console.log('hosting key',image_hosting_key)

    const {_id, university_name,service_charge,
        application_deadline, scholarship_name,subject_category,
        scholarship_category, application_fees }= scholarship;


    const totalPrice =scholarship.tuition_fees + scholarship.application_fees;

    useEffect(()=>{
       if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent',{price: totalPrice})
        .then(res =>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret);
        })
       }
    },[axiosSecure, totalPrice])

    const handlePay = async(event)=>{
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const { error, paymentMethod }= stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('Payment error ', error);
            setError(error.message)
        }else{
            console.log('Payment method ', paymentMethod)
            setError('')
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card:card,
                billing_details:{
                    email:user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id ', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                // now save payment data to database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), //utc date convert. use moment js to convert
                    scholarshipIds:_id, 
                    status:'pending'

                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment save ',res);
                if(res.data?.insertedId){
                    Swal.fire('Thank You for payment')
                    .then(()=>{
                        setShow(true);
                    })
                }
            }
        }
    }

    const onSubmit = async(data)=>{
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
                applicant_photo: res.data.data.display_url,
                applicant_address:data.address,
                applicant_gender: data.gender,
                applicant_applying_degree: data.degree,
                application_fees:application_fees,
                application_deadline:application_deadline,
                service_charge:service_charge,
                ssc_result: parseFloat(data.ssc),
                hsc_result: parseFloat(data.hsc),
                study_gap: data.study_gap ,
                university_name: data.university_name,
                scholarship_name:scholarship_name,
                scholarship_category: data.scholarship_category,
                subject_category: data.subject_category,
                user_name: user.displayName,
                user_email: user.email,
                scholarship_id: _id,
                applied_date: formattedDate, //convert utc
                status:'pending'
            }
            
            const appliedScholarshipRes= await axiosSecure.post('/applied-scholarships', applied_scholarship)
            console.log(appliedScholarshipRes)
            if(appliedScholarshipRes.data.insertedId){
                // show success popup
                Swal.fire({
                    title: "Congratulations!",
                    text: "You applied Successfully!",
                    icon: "success"
                  });
            }
        }
    }

    return (
        <>
        {!show ?
        (<form onSubmit={handlePay}>
            <CardElement
               options={{
                   style: {
                       base: {
                       fontSize: '16px',
                       color: '#424770',
             '             ::placeholder': {
                               color: '#aab7c4',
                           },
                       },
                       invalid: {
                                   color: '#9e2146',
                               },
                           },
                       }}
           />
           <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
               Pay
           </button>
           <p className="text-red-600">{error}</p>
           {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p> }
       </form>)
       :
       (
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
                            <input type="text" {...register('phone',{required:true})} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
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
                            <input type="text" {...register('address',{required:true})} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Gender</span>
                            </div>
                            <select defaultValue="default" className="select select-bordered w-full" {...register('gender',{required:true})} >
                                <option disabled value="default">Pick one</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Degree</span>
                            </div>
                            <select defaultValue="default" className="select select-bordered w-full" {...register('degree',{required:true})} >
                                <option disabled value="default">Pick one</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">SSC Grade</span>
                            </div>
                            <input type="text" {...register('ssc',{required:true})} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <div>
                       {/* right side */}
                       <div className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">HSC Grade</span>
                            </div>
                            <input type="text" {...register('hsc',{required:true})} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Study Gap</span>
                            </div>
                            <select defaultValue="default" {...register('study_gap',{required:true})} className="select select-bordered w-full" >
                                <option disabled value="default">Pick one</option>
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
       )    
    }
        </>
    );
};

export default CheckoutForm;