import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  confirmPassword: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  email: { type: String, required: true, unique: true, lowercase: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

export default mongoose.model('User', userSchema);
