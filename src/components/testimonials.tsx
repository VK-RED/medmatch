export const Testimonials = () => {

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Testimonials</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <blockquote className="text-gray-500 text-justify md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Medmatch has been an invaluable tool in my preparation for medical interviews. The AI simulations are
                  incredibly realistic, and the feedback provided has helped me identify areas for improvement. I feel
                  much more confident after using Medmatch, and I would highly recommend it to any medical student.
                </blockquote>
                <div className="flex items-center space-2">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="64"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "64/64",
                      objectFit: "cover",
                    }}
                    width="64"
                  />
                  <div className="ml-2">
                    <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Medical Student</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <blockquote className="text-gray-500 text-justify md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  As a medical school admissions officer, I have been impressed by the quality of candidates who have
                  used Medmatch. The platform provides a realistic and comprehensive experience, allowing applicants to
                  showcase their skills and knowledge. I believe that Medmatch is an excellent tool for preparing for
                  medical school interviews.
                </blockquote>
                <div className="flex items-center space-2">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="64"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "64/64",
                      objectFit: "cover",
                    }}
                    width="64"
                  />
                  <div className="ml-2">
                    <h4 className="font-semibold">Dr. Michael Lee</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admissions Officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}