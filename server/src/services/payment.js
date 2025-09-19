import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (userId, cart, amount) => {
  return await stripe.paymentIntents.create({
    currency: 'usd',
    amount: Math.round(amount * 100),
    automatic_payment_methods: { enabled: true },
    metadata: {
      userId,
      cart: JSON.stringify(cart)
    }
  });
};
