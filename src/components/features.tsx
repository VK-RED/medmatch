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
                            Custom exam-level vignettes created by Harvard Med OBGYN Faculty.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">

                        <div className='flex items-center gap-3 mx-auto'>
                            <BookOpenCheck />
                            <h3 className="text-2xl font-bold">AI Interview Simulations</h3>
                        </div>
                    
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Speak like you're talking to a real human interviewer
                        </p>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className='flex items-center gap-3 mx-auto'>
                            <PackageOpen />
                            <h3 className="text-2xl font-bold">Get Interviewed on your case list</h3>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Get Tailored Board-level questions on your case list PDF
                        </p>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className='flex items-center gap-3 mx-auto'>
                            <LibraryBig />
                            <h3 className="text-2xl font-bold">Get control of your time</h3>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Practice at any hour of the day, whenever you have down time
                        </p>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className='flex items-center gap-3 mx-auto'>
                            <ShieldCheck />
                            <h3 className="text-2xl font-bold">Mock Interviews</h3>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Learn from Harvard Med attending level questions, without worrying about failing in front of a real doctor!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}