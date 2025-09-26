import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendMail.js';
import { findUserByEmail, createUser } from '../repositories/user.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import {
  welcomeTemplate,
  resetPasswordTemplate
} from '../emailTemplates/index.js';
import {
  compareToken,
  resetTokenHash,
  comparePassword,
  encryptPassword,
  generateResetToken
} from '../utils/general.js';

export const userRegister = async (user, res) => {
  const { name, email, password } = user;
  const existUser = await findUserByEmail(email);
  if (existUser) return errorResponse(res, 'User already exists.', 409);

  const hashedPassword = await encryptPassword(password);
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword
  });
  const html = welcomeTemplate();
  await sendEmail(email, 'Welcome to Our Platform!', html);
  return successResponse(res, newUser, 'Successfully Registered', 201);
};

export const userLogin = async (user, res) => {
  const { email, password } = user;
  const login_user = await findUserByEmail(email);
  if (!login_user) return errorResponse(res, 'Invalid credentials', 400);

  if (login_user.isBlocked)
    return errorResponse(
      res,
      'Your account has been blocked. Please contact support.',
      403
    );

  const isMatch = await comparePassword(password, login_user.password);

  if (!isMatch) return errorResponse(res, 'Invalid credentials', 400);

  login_user.lastLogin = new Date();
  await login_user.save();
  const token = jwt.sign(
    { _id: login_user._id, role: login_user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const userData = {
    _id: login_user._id,
    name: login_user.name,
    role: login_user.role,
    email: login_user.email
  };
  return successResponse(
    res,
    { user: userData, token },
    'Successfully Logged in'
  );
};

export const forgotPassword = async (user, res) => {
  const { email } = user;
  const existUser = await findUserByEmail(email);
  if (!existUser) return errorResponse(res, 'User not found.', 404);

  const token = generateResetToken();
  const hashedToken = await resetTokenHash(token);

  existUser.resetPasswordToken = hashedToken;
  existUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
  await existUser.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
  const html = resetPasswordTemplate(resetUrl);

  await sendEmail(email, 'Password Reset Request', html);
  return successResponse(
    res,
    existUser,
    'Password reset link sent to your email'
  );
};

export const resetPassword = async (user, res) => {
  const { token, email, password } = user;
  const existUser = await findUserByEmail(email);
  if (!existUser) return errorResponse(res, 'User not found.', 404);

  const isTokenValid = await compareToken(token, existUser.resetPasswordToken);

  if (!isTokenValid || existUser.resetPasswordExpires < Date.now())
    return errorResponse(res, 'Invalid or expired reset token', 400);

  const hashedPassword = await encryptPassword(password);

  // Update user password and clear reset token
  existUser.password = hashedPassword;
  existUser.resetPasswordToken = undefined;
  existUser.resetPasswordExpires = undefined;
  await existUser.save();
  return successResponse(res, user, 'Password reset successfully');
};
