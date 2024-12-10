import { RUNTIME_ENV } from '@/utils/env';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { generateAccessToken, type UserPayload } from '@/utils/jwt';

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error('All fields are required');
  }

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) throw new Error('Unauthorized');

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) throw new Error('Unauthorized');

  const accessToken = generateAccessToken({ username, id: foundUser.id });
  const refreshToken = jwt.sign(
    {
      username: foundUser.username
    },
    RUNTIME_ENV.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  foundUser['refreshToken'] = refreshToken;
  foundUser.save();

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https - even though localhost is http, it is fine to keep this in development, it will work
    sameSite: 'none', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7-day cookie expiry: set to match refreshToken
  });

  // Send accessToken containing username
  res.json({ accessToken });
});

// @desc Refresh; generates a new access token in the case it has expired for the user
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  // do stuff
  const cookies = req.cookies;

  if (!cookies?.jwt) throw new Error('Unauthorized');

  const refreshToken = cookies.jwt;

  // Search the database for a user with the refreshToken that was sent via HttpOnly cookie
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) throw new Error('Forbidden'); // No user found

  jwt.verify(refreshToken, RUNTIME_ENV.JWT_REFRESH_SECRET, function (err: any, decoded: any) {
    // if error or the username that was recorded in the refreshToken does not match with the username of the user we searched for with the refreshToken
    if (err || foundUser.username !== (decoded as UserPayload).username)
      throw new Error('Forbidden');

    const accessToken = generateAccessToken;
    res.json({ accessToken });
  });
});

// @desc Logout - clears the cookie if it exists and deletes it from the associated User's doc in the db
// @route POST /auth/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(204).json({ message: 'Logout successful' });
    return;
  } // No content; request successful there was no jwt cookie
  const refreshToken = cookies.jwt;
  // Delete refreshToken in the database
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (foundUser) {
    foundUser.refreshToken = '';
    foundUser.save();
  }
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ message: 'Cookie cleared' });
});

export default { login, refresh, logout };
