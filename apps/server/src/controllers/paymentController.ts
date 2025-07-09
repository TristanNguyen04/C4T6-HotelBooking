import { Router,Request,Response } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_KEY as string,
    {
        apiVersion: "2025-05-28.basil",
        typescript: true
    });

export const createCheckoutSession = async(req:Request, res:Response) => {
    try {
        // dynamically adding from post request from confirmation page to the checkout page
        const {items} = req.body;
        const line_items = items.map((item:any) => ({
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price,
            },
            quantity: item.quantity
        }));
        const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:5173', // this should be routed to a confirmation page/ homepage
        cancel_url: 'http://localhost:5173/payment', // routed to homepage or the page before or something
        mode: "payment",
        line_items,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Failed to create session" });
    }
};