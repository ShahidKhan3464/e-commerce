import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed:', error.message);
  }
};

export default connectDB;
