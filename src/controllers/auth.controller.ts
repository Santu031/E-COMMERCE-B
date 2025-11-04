import { Request, Response } from 'express';
import { authService, LoginResult } from '../services/auth.service';
import { IUser } from '@models/User.model';

// Send response helper
const sendResponse = (res: Response, success: boolean, data: any, message: string, statusCode = 200) => {
  res.status(statusCode).json({
    success,
    message,
    data
  });
};

export const authController = {
  // Register a new user
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      // Validate required fields
      if (!email || !password || !firstName || !lastName) {
        return sendResponse(res, false, null, 'All fields are required', 400);
      }
      
      // Validate password length
      if (password.length < 6) {
        return sendResponse(res, false, null, 'Password must be at least 6 characters', 400);
      }
      
      const result: LoginResult = await authService.register(email, password, firstName, lastName);
      
      // Remove password from response
      const userResponse = {
        _id: result.user._id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role
      };
      
      sendResponse(res, true, { 
        user: userResponse, 
        token: result.token 
      }, 'User registered successfully', 201);
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Registration failed', 400);
    }
  },

  // Login user
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // Validate required fields
      if (!email || !password) {
        return sendResponse(res, false, null, 'Email and password are required', 400);
      }
      
      const result: LoginResult = await authService.login(email, password);
      
      // Remove password from response
      const userResponse = {
        _id: result.user._id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        role: result.user.role
      };
      
      sendResponse(res, true, { 
        user: userResponse, 
        token: result.token 
      }, 'Login successful');
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Login failed', 401);
    }
  },

  // Get user profile
  getProfile: async (req: Request, res: Response) => {
    try {
      // Assuming user ID is attached to req.user by auth middleware
      const userId = (req as any).user.id;
      
      const user: IUser = await authService.getProfile(userId);
      
      // Remove password from response
      const userResponse = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };
      
      sendResponse(res, true, userResponse, 'Profile fetched successfully');
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Failed to fetch profile', 404);
    }
  }
};