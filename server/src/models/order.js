import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId
    },
    products: [
      {
        name: String,
        price: Number,
        image: String,
        category: String,
        quantity: Number,
        description: String,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
      }
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paymentIntentId: {
      type: String,
      required: true
    },
    orderStatus: {
      type: String,
      default: 'pending',
      enum: ['pending', 'shipped', 'delivered', 'cancelled']
    },
    paymentStatus: {
      type: String,
      default: 'paid',
      enum: ['paid', 'unpaid', 'refunded']
    }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
