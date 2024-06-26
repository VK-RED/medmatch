
// TODO : EDIT THE DEFPROMPT 

export const SOMETHING_WENT_WRONG = `SOMETHING WENT WRONG PLEASE CONTACT THE ADMIN`
export const USER_NOT_LOGGED_IN = `USER NOT LOGGED IN`
export const USER_NOT_EXISTS = `THE REQUESTED USER DOES NOT EXIST, PLEASE CREATE AN ACCOUNT FIRST`
export const DEF_PROMPT = `YOU ARE AN INTERVIEWER CONDUCTING INTERVIEW.YOU SHOULD ASK ME QUESTIONS ONE BY ONE. ONLY AFTER I HAVE ANSWERED THE CURRENT QUESTION CORRECTLY YOU CAN MOVE TO NEXT QUESTION.WHEN I'M ANSWERING THE QUESTIONS WRONGLY, YOU CAN PROVIDE HINTS AND MOVE TOWARDS ME IN THE RIGHT DIRECTION. ONCE YOU HAVE ASKED ME ALL THE QUESTIONS. YOU CAN ONLY START THE INTERVIEW WHEN I SAY I'M READY. ALSO YOU SHOULD ONLY ASK ME QUESTIONS FROM THE TOPIC JAVASCRIPT`
export const RESPONSE_MISSING = `RESPONSE FROM OPENAI IS MISSING`
export const INTERVIEW_INITIALIZED =  `The Interview has been initialized Successfully`
export const READY_MESSAGE = `I AM READY FOR THE INTERVIEW, YOU CAN START ASKING ME QUESTIONS`
export const NO_INTERVIEW_EXISTS = `THERE IS NO INTERVIEW EXISTS FOR THE GIVEN ID. KINDLY CHECK THE ID AND TRY AGAIN`
export const CHAT_COMPLETED = `THE INTERVIEW HAS BEEN COMPLETED. YOU CAN NO LONGER ASK OR ANSWER QUESTIONS`
export const INTERVIEW_ENDED = `THE INTERVIEW HAS BEEN ENDED SUCCESSFULLY`
export const SIGNIN_TITLE = `Login to your account`
export const SIGNIN_DESCRIPTION =`Enter your email and password below`
export const SIGNUP_TITLE = `Create an Account`
export const SIGNUP_DESCRIPTION = `Enter your name, email and password`
export const USER_EXISTS_ALREADY = `User Exists Already. Try Signing In !!`
export const USER_CREATED = `User Created Successfully !!`
export const USER_FIRST_MESSAGE = `You can start asking the questions !`
export const INTERVIEW_INITIALIZATION_FAILED = `Interview Initialization Failed !`
export const TRY_LATER = `Can't start Interview at the moment please try after some time`
export const LANGCHAIN_SYSTEM_PROMPT = `You are an OB-GYN Interviewer. You will be given a Context:{context} which consists of several patients diseases, diagnosis and treatment by a resident. You should ask the resident what was the cause of the disease ? How did the resident diagnosed it and how did he treated the patient.  You should validate the resident's answer and If the resident answers wrong response try to give some hints and point the resident in correct direction. Also don't use the words like "let's get started". Don't repeat yourself ever and your responses should be short, crisp and clear to the point. `