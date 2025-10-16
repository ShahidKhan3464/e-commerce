import React, { useState } from 'react';
import useCartStore from '@/store/cart';
import CheckoutForm from './checkout-form';
import Button from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cartItems, getTotals, removeItem, updateQuantity } = useCartStore();
  const { totalPrice } = getTotals();

  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty 🛒</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  alt={item.name}
                  src={`http://localhost:3000${item.image}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="p-2 bg-gray-200 cursor-pointer rounded-full hover:bg-gray-300"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="p-2 bg-gray-200 cursor-pointer rounded-full hover:bg-gray-300"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="cursor-pointer text-red-500 mt-2 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (0%)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {!showCheckout && (
              <Button
                variant="primary"
                className="mt-4 w-full"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            )}

            {showCheckout && (
              <div className="mt-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
