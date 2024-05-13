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
          <section id="success" className="flex flex-col items-center ">
            
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {`Payment received Successfully ! `}
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-3xl font-semibold">
              {`We appreciate your interest! `}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {`If you have any questions, please email to`} <a href="mailto:orders@medmatch.com">{`contact@medmatch.com`}</a>.
            </p>
              
          </section>
        )
      }
    
      return null;

}