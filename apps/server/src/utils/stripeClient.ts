import Stripe from "stripe";

const stripe = new Stripe(
    process.env.STRIPE_KEY as string,
    {
        apiVersion: "2025-06-30.basil",
        typescript: true
    });

export default stripe;