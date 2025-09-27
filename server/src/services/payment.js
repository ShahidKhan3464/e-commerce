import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (data) => {
  const { userId, cart, amount, shippingAddress } = data;
  return await stripe.paymentIntents.create({
    currency: 'usd',
    amount: Math.round(amount * 100),
    automatic_payment_methods: { enabled: true },
    metadata: {
      userId,
      shipping: JSON.stringify(shippingAddress),
      cartIds: cart.map((item) => item._id).join(',')
    },
    shipping: {
      name: shippingAddress.fullName,
      address: {
        city: shippingAddress.city,
        line1: shippingAddress.address,
        country: shippingAddress.country,
        postal_code: shippingAddress.postalCode
      }
    }
  });
};
