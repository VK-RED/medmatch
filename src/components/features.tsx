import { BookOpenCheck } from 'lucide-react';
import { PackageOpen } from 'lucide-react';
import { LibraryBig } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

export const Features = () => {
    return (
        <section className="w-full py-12 md:py-24  border">
            <div className="container space-y-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Features</h2>
                        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Unlock the secrets to acing your OB-GYN Interviews with the personalized AI Experience.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">

                        <div className='flex items-center gap-3'>
                            <BookOpenCheck />
                            <h3 className="text-2xl font-bold">AI Interview Simulations</h3>
                        </div>
                    
                        <p className="text-gray-500 dark:text-gray-400">
                            Gain experience with our tailored realistic Interview scenarios.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className='flex items-center gap-3'>
                            <PackageOpen />
                            <h3 className="text-2xl font-bold">Interview  Archive</h3>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Revisit each questionnaire and review your responses, empowering you to reflect on your progress and refine your interview strategies. 
                        </p>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className='flex items-center gap-3'>
                            <LibraryBig />
                            <h3 className="text-2xl font-bold">Medical Knowledge Base</h3>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Access a comprehensive library of OB-GYN information to enhance your knowledge.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className='flex items-center gap-3'>
                            <ShieldCheck />
                            <h3 className="text-2xl font-bold">Mock Interviews</h3>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Practice with our library of mock interviews and build confidence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}