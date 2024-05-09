'use client';

import { createSession } from "@/actions/stripe/createSession";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUB_KEY as string);

export const CheckoutForm = ({productId}:{productId:string}) => {

    const fetchClientSecret = useCallback(async ()=>{
        const res = await createSession(productId);
        return res.clientSecret;
    },[productId])

    const options = {fetchClientSecret};

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}