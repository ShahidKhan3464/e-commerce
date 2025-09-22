import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    lastLogin: { type: Date },
    confirmPassword: { type: String },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    email: { type: String, required: true, unique: true, lowercase: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('orderCount').get(function () {
  return this.orders ? this.orders.length : 0;
});

export default mongoose.model('User', userSchema);
