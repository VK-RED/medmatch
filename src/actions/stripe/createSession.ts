'use server';

import { basic_price_id, basic_product_id, premium_price_id, stripe } from "@/lib/stripe"

const DOMAIN = (process.env.NODE_ENV === 'production') ? 'https://medmatch.vercel.app' : 'http://localhost:3000';

export const createSession = async(productId:string) => {
    
    const priceId = (productId === basic_product_id) ? basic_price_id : premium_price_id;

    const session = await stripe.checkout.sessions.create({
        ui_mode:"embedded",
        line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: priceId,
              quantity: 1,
            },
          ],
        mode: 'payment',
        return_url: `${DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    return {clientSecret: session.client_secret as string};
}