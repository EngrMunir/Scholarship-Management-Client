import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useParams } from "react-router-dom";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PK_API)

const Payment = () => {
    const location = useLocation();
    const { scholarship }= location.state;
    
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm scholarship={scholarship} ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;