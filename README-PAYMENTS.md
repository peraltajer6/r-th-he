# Accepting real payments

This adds a cart + Stripe Checkout to the catalog. Stripe hosts the actual
payment page, so card numbers never touch your own code — you just ask
Stripe to create a "checkout session" and send the customer there.

## What you need

- A Firebase project on the **Blaze (pay-as-you-go)** plan. Cloud Functions
  that call out to the internet (like Stripe) require Blaze — it still has
  a generous free tier, you won't be charged for normal traffic.
- A [Stripe account](https://dashboard.stripe.com/register) (free to create;
  stay in **test mode** until you're ready to go live).
- The [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`

## 1. Fill in your Firebase config

Firebase Console → Project settings → General → "Your apps" → add a web app
if you haven't. Copy the config object into `firebase-config.js`, replacing
the `REPLACE_ME` values.

## 2. Connect this folder to your Firebase project

```bash
firebase login
firebase use --add          # pick your project
```

## 3. Add your Stripe keys as secrets

Get these from the Stripe Dashboard → Developers → API keys (test mode
first). Use the **secret** key, not the publishable one.

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```

You'll set `STRIPE_WEBHOOK_SECRET` in step 5, after Stripe gives you one.

## 4. Update the redirect URL

In `functions/index.js`, change:

```js
const SITE_URL = "https://YOUR-PROJECT-ID.web.app";
```

to your real Firebase Hosting URL (or custom domain).

## 5. Deploy

```bash
firebase deploy --only functions,hosting
```

This gives you a webhook URL like:
`https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/stripeWebhook`

In the Stripe Dashboard → Developers → Webhooks → "Add endpoint", paste that
URL, and select the `checkout.session.completed` event. Stripe will show you
a signing secret (`whsec_...`) — set it:

```bash
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
firebase deploy --only functions
```

## 6. Test it

Open your deployed site, add something to the cart, click checkout, and pay
with Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC,
any ZIP. You should land on the success screen, and see the order appear in
Firestore under the `orders` collection.

## Going live

- Swap your Stripe keys from test mode to live mode (same commands, live
  keys) once you're ready to accept real cards.
- Since prices are looked up server-side from `functions/medicines.js`, keep
  that file in sync with the top-level `medicines.js` whenever you change
  prices — the checkout always charges whatever's in the functions copy.
- A pharmacy site selling real medicine will also have prescription
  verification and licensing requirements that are separate from payment
  processing — worth checking with a pharmacist/lawyer for your
  jurisdiction before this goes live for real orders.
