'use client';
import { CheckoutForm } from '@/components/CheckoutForm';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function CheckoutPage(){
    const {id:productId} = useParams<{id:string}>();
    const {status} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push("/signin");
        }
    },[status])

    if(status === 'loading'){
        return (
            <div>
                Loading ....
            </div>
        )
    }
    else if(status === 'authenticated'){
        return (
            <div className='h-screen'>
                <CheckoutForm key={productId} productId={productId}/>
            </div>
        )
    }
}