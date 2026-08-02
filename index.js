// functions/index.js
//
// Two functions:
//   createCheckoutSession  — callable from the site, builds a Stripe Checkout
//                            session using SERVER-SIDE prices (never trust
//                            prices sent from the browser), returns the URL
//                            to redirect the customer to.
//   stripeWebhook          — receives events from Stripe once payment
//                            succeeds, and writes the order to Firestore.
//
// Setup (see README-PAYMENTS.md for the full walkthrough):
//   firebase functions:secrets:set STRIPE_SECRET_KEY
//   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET

const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const Stripe = require("stripe");
const { MEDICINES } = require("./medicines");

admin.initializeApp();
const db = admin.firestore();

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

// Where Stripe sends the customer back to after checkout.
// Change this to your real deployed domain before going live.
const SITE_URL = "https://YOUR-PROJECT-ID.web.app";

exports.createCheckoutSession = onCall(
  { secrets: [STRIPE_SECRET_KEY] },
  async (request) => {
    const stripe = Stripe(STRIPE_SECRET_KEY.value());
    const items = request.data && request.data.items;

    if (!Array.isArray(items) || items.length === 0) {
      throw new HttpsError("invalid-argument", "Cart is empty.");
    }

    const line_items = items.map((item) => {
      const med = MEDICINES.find((m) => m.id === item.id);
      if (!med) throw new HttpsError("invalid-argument", `Unknown item: ${item.id}`);
      if (!med.inStock) throw new HttpsError("failed-precondition", `${med.name} is out of stock.`);

      const qty = Math.max(1, Math.min(50, parseInt(item.qty, 10) || 1));

      return {
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(med.price * 100), // Stripe wants cents, priced from OUR data
          product_data: {
            name: med.name + (med.strength ? ` (${med.strength})` : ""),
            description: med.category + " · " + med.form,
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${SITE_URL}/#checkout-success`,
      cancel_url: `${SITE_URL}/#checkout-cancelled`,
    });

    return { url: session.url };
  }
);

exports.stripeWebhook = onRequest(
  { secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] },
  async (req, res) => {
    const stripe = Stripe(STRIPE_SECRET_KEY.value());
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET.value());
    } catch (err) {
      console.error("Webhook signature check failed", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      await db.collection("orders").doc(session.id).set({
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details ? session.customer_details.email : null,
        paymentStatus: session.payment_status,
        items: lineItems.data.map((li) => ({
          description: li.description,
          quantity: li.quantity,
          amountTotal: li.amount_total,
        })),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.json({ received: true });
  }
);
