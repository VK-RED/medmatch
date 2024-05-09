'use client'

import { getSession } from "@/actions/stripe/getSession";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export const Return = () => {

    const [status, setStatus] = useState<Stripe.Checkout.Session.Status|null>(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        console.log(`The created Session id is ${sessionId}`);

        async function getData(){
            const data = await getSession(sessionId as string);
            setStatus(data.status);
            setCustomerEmail(data.customer_email||"");
        }
    
        getData();
      }, []);

      useEffect(()=>{
        console.log(`The status is changed and it is ${status}`);
      },[status])

      if (status === 'open') {
        router.push("/checkout");
        return;
      }
      
      else if(status === 'complete') {
        return (
          <section id="success">
            <p>
              {`We appreciate your interest! A confirmation email will be sent to ${customerEmail}.`}
    
              {`If you have any questions, please email`} <a href="mailto:orders@medmatch.com">{`orders@medmatch.com`}</a>.
            </p>
          </section>
        )
      }
    
      return null;

}