import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useCartStore from '@/store/cart';
import useAuthStore from '@/store/auth';
import Input from '@/components/ui/input';
import useOrderStore from '@/store/order';
import Button from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import paymentService from '@/services/payment';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);
  const { cartItems, getTotals, clearCart } = useCartStore();
  const [shipping, setShipping] = useState({
    city: '',
    address: '',
    country: '',
    postalCode: '',
    fullName: user.name || ''
  });
  const { totalPrice } = getTotals();

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);
      const payload = {
        cart: cartItems,
        userId: user._id,
        amount: totalPrice,
        shippingAddress: shipping
      };
      const { clientSecret } = await paymentService.createPayment(payload);

      // 2️⃣ Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user.email,
              name: shipping.fullName,
              address: {
                city: shipping.city,
                line1: shipping.address,
                country: shipping.country,
                postal_code: shipping.postalCode
              }
            }
          }
        }
      );

      if (error) {
        setLoading(false);
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        const orderedPayload = {
          totalPrice,
          userId: user._id,
          products: cartItems,
          shippingAddress: shipping,
          paymentIntentId: paymentIntent.id
        };
        const { status } = await createOrder(orderedPayload);
        if (status) {
          clearCart();
          setLoading(false);
          toast.success('Payment successful');
          navigate('/orders');
        }
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Input
          required
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          value={shipping.fullName}
        />
        <Input
          required
          name="address"
          onChange={handleChange}
          value={shipping.address}
          placeholder="Street Address"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            required
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleChange}
          />
          <Input
            required
            name="postalCode"
            onChange={handleChange}
            placeholder="Postal Code"
            value={shipping.postalCode}
          />
        </div>
        <Input
          required
          name="country"
          placeholder="Country"
          onChange={handleChange}
          value={shipping.country}
        />
      </div>
      <CardElement className="p-4 border border-gray-300 rounded-lg" />
      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full"
        disabled={!stripe || loading || cartItems.length === 0}
      >
        {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
      </Button>
    </form>
  );
}
