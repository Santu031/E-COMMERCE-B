import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '@models/User.model';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    id: (user._id as unknown as string).toString(),
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expire
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as JwtPayload;
  } catch (error) {
    return null;
  }
};