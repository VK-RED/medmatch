'use server';

import { stripe } from "@/lib/stripe";

export const getSession = async (session_id:string) =>{
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return ({
        status: session.status,
        customer_email: session.customer_details?.email
    });
}