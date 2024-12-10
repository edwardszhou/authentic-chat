import jwt from 'jsonwebtoken';
import { RUNTIME_ENV } from './env';

export type UserPayload = {
  username: string;
  id: string;
};

export function generateAccessToken(userPayload: UserPayload) {
  if (!RUNTIME_ENV.JWT_ACCESS_SECRET) throw new Error('JWT Secret Key is not defined');
  return jwt.sign(
    {
      user: userPayload
    },
    RUNTIME_ENV.JWT_ACCESS_SECRET,
    { expiresIn: '1m' }
  );
}
