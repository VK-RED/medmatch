import { basic_price_id, stripe, webhook_secret } from "@/lib/stripe";
import { headers } from "next/headers";
import {  NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { SubscriptionMinutes } from "@/lib/types";

export async function POST(req: Request) {
    
    const endpointSecret = webhook_secret;
    
    const sig = headers().get('stripe-signature') as string;

    let event: Stripe.Event;
    let body;
    try {
        body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.log("The error is : ",err);
        return NextResponse.json({message:"Parsing went wrong"})
    }
    
    // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {

    console.log('✅ Success:', event.id);
    console.log(event.type);

    const payload = await JSON.parse(body);

    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = sessionWithLineItems.line_items;

    const priceId = lineItems?.data[0].price?.id as string;

    const {email}:{email:string} = payload.data.object.customer_details;

    // Fulfill the purchase...
    await fulfillOrder(priceId,email);

  }
  else if(event.type === 'charge.succeeded'){
    const payload = await JSON.parse(body);

    //extract the email, receipt url and payment intent save it in DB

    const {payment_intent,billing_details,receipt_url}:{payment_intent:string,billing_details:any,receipt_url:string} = payload.data.object;

    const {email} : {email:string} = billing_details;

    console.log("---------------------------------------------");

    console.log("The Data from charge.succeeded is :");
    console.log("payment_intent : ",payment_intent);
    console.log("Receipt Url :",receipt_url);
    console.log("Email : ", email);

    const user = await prisma.user.findFirst({
      where:{
        email:email,
      },
      select:{
        id:true
      }
    })

    const payment = await prisma.payment.create({
      data:{
        payment_intent,
        receipt_url,
        userId:user?.id || "PAYMENT_WITHOUT_EMAIL"
      },
    })

    console.log("Saved the payment details in db");

    console.log("---------------------------------------------");
  }

  return NextResponse.json({message:"Hooray it worked !!"})
}

const fulfillOrder = async (priceId:string,email:string) => {
    
    const paid_minutes : SubscriptionMinutes = (priceId === basic_price_id) ? 60 : 300;

    const user = await prisma.user.findFirst({
      where:{
        email,
      },
      select:{
        id:true,
        minutesLeft:true,
      }
    })

    if(!user){
      console.error("User missing for the given email!",email);
      return;
    }

    await prisma.user.update({
      where:{
        id:user.id
      },
      data:{
        minutesLeft: paid_minutes + user.minutesLeft,
      }
    })

    console.log("Update minutes for the user : ", email);
    return;
}

