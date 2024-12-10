import jwt from 'jsonwebtoken';

export type UserPayload = {
  username: string;
  id: string;
  firstName?: string;
  lastName?: string;
};

export function generateAccessToken(userPayload: UserPayload) {
  if (!process.env.ACCESS_TOKEN_SECRET) throw new Error('JWT Secret Key is not defined');
  return jwt.sign(
    {
      ...userPayload
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' }
  );
}
