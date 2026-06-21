import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { createOrder } from "@/lib/actions/order.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  // ✅ ONLY HANDLE SUCCESSFUL PAYMENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("🔥 SESSION RECEIVED:", session.id);
    console.log("📦 METADATA:", session.metadata);

    const eventId = session.metadata?.eventId;
    const buyerId = session.metadata?.buyerId;

    if (!eventId || !buyerId) {
      console.error("❌ Missing metadata in Stripe session");
      return NextResponse.json(
        { error: "Missing metadata" },
        { status: 400 }
      );
    }

    try {
      await createOrder({
        stripeId: session.id,
        eventId,
        buyerId,
        totalAmount: String((session.amount_total || 0) / 100),
        createdAt: new Date(),
      });

      console.log("✅ Order created successfully");
    } catch (error) {
      console.error("❌ Error creating order:", error);
      return NextResponse.json(
        { error: "Order creation failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}