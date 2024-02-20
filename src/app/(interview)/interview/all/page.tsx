'use client';

import { USER_NOT_LOGGED_IN } from '@/lib/constants';
import { AllInterviewsType } from '@/lib/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InterviewCard } from '@/components/interviewCard';
export default function AllInterviews(){

    const {status} = useSession();
    const router = useRouter();
    const[interviews,setInterviews] = useState<{title:string,id:string}[]>([]);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push('/');
        }
        if(status === 'authenticated') getAllInterviews();
    },[status])

    useEffect(()=>{
    },[interviews])

    const getAllInterviews = async () => {
        const res = await axios.get('/api/interview/all');
        const data:AllInterviewsType = res.data;
        console.log(data)
        if(data.message === USER_NOT_LOGGED_IN){
            router.push('/signin');
        }
        //@ts-ignore
        setInterviews((p)=>data.interviews);
        setLoading((p)=>false);
    } 

    if(status === 'loading' || loading){
        return <div>
            Loading ....
        </div>
    }

    return (
        <div className='pt-10 flex flex-col items-center'>

            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                All Interviews
            </h2>

            <div className='grid gap-10 mt-8 md:grid-cols-2 lg:grid-cols-3 '>
                {
                    interviews.map((i)=>(
                        <div onClick={()=>{
                            router.push(`/interview/${i.id}`)
                        }}>
                            <InterviewCard title={i.title}/>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
