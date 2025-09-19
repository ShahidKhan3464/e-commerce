import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';

export const isAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'Access denied. No token provided.', 401);
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle expired token
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token has expired.', 401);
    }

    // Handle other token verification errors
    return errorResponse(res, 'Unauthorized access.', 401);
  }
};
