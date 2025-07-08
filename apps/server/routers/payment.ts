import { Router,Request,Response } from "express";
import { Stripe } from "stripe";

const router = Router();

const stripe = new Stripe(
    process.env.STRIPE_KEY as string,
    {
        apiVersion: "2025-05-28.basil",
        typescript: true
    });

router.post("/paymentintent", async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000', // this should be routed to a confirmation page/ homepage
      cancel_url: 'http://localhost:3000', // routed to homepage or the page before or something
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {name: 'Hotel Booking - 2 Day 2 Night', images:["https://www.orient-express.com/wp-content/uploads/2024/12/JUNIOR-SUITE_209_-Bedroom-scaled.jpg"]},
            unit_amount: 10000},
          quantity: 1,
        },
        {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Hotel B - Standard Room",
          images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgw1QcpVM_ETgHLuSxL9GMVLXULvNq4ePDg&s']
        },
        unit_amount: 9000,
      },
      quantity: 2
    },
      ],
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

export default router;
