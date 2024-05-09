'use client';
import { CheckoutForm } from '@/components/CheckoutForm';
import { useParams } from 'next/navigation'

export default function CheckoutPage(){
    const {id:productId} = useParams<{id:string}>();
    
    return (
        <div className='h-screen'>
            <CheckoutForm key={productId} productId={productId}/>
        </div>
    )
}