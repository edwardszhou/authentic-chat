import { RUNTIME_ENV } from '@/utils/env';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  console.log(authHeader);
  const token = authHeader.split(' ')[1];

  jwt.verify(token, RUNTIME_ENV.JWT_ACCESS_SECRET, (err: any, decoded: any) => {
    // decoded holds the now-decoded information held inside of the JWT
    if (err) return res.status(403).json({ message: 'Forbidden' }); // invalid token
    req.user = decoded.user.username;
    next();
  });
}
