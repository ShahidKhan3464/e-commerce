import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId
    },
    cart: [
      {
        title: String,
        price: Number,
        quantity: Number,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    paymentIntentId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'paid',
      enum: ['pending', 'paid', 'failed']
    }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
