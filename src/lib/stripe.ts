import {Stripe} from "stripe";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY as string;

declare global{
    var global_stripe: Stripe | undefined
}

const createStripe = () => {
    if(process.env.NODE_ENV === 'development'){
        if(!globalThis.global_stripe){
            globalThis.global_stripe = new Stripe(stripeKey);
            console.log("Initialized Stripe");
        }
        return globalThis.global_stripe;
    }
    else{
        console.log("Initializing Stripe in Prod");
        return new Stripe(stripeKey);
    }
}
export const basic_product_id = process.env.NEXT_PUBLIC_BASIC_PROD_ID as string;
export const basic_price_id = process.env.BASIC_PRICE_ID as string;

export const premium_product_id = process.env.NEXT_PUBLIC_PREMIUM_PROD_ID as string;
export const premium_price_id = process.env.PREMIUM_PRICE_ID as string;

export const webhook_secret = process.env.WEBHOOK_SECRET as string;

export const stripe = createStripe();