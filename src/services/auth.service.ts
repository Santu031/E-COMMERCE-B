import User, { IUser } from '@models/User.model';
import { generateToken } from '../utils/jwt.utils';

export interface LoginResult {
  user: IUser;
  token: string;
}

export const authService = {
  // Register a new user
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<LoginResult> => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    return { user, token };
  },

  // Login user
  login: async (email: string, password: string): Promise<LoginResult> => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user);

    return { user, token };
  },

  // Get user profile
  getProfile: async (userId: string): Promise<IUser> => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
};