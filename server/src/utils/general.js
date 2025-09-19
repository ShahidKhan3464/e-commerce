import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const resetTokenHash = async (token) => {
  return await bcrypt.hash(token, 10);
};

export const compareToken = async (token, hashedToken) => {
  return await bcrypt.compare(token, hashedToken);
};
