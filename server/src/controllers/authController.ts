import User from '@/models/User';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: 'Unauthorized' });

  const accessToken = jwt.sign(
    {
      user: {
        username: foundUser.username,
        id: foundUser.id
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Save the refresh token with the User in the databse
  foundUser['refreshToken'] = refreshToken;
  foundUser.save();

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https - even though localhost is http, it is fine to keep this in development, it will work
    sameSite: 'None', //cross-site cookie
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

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  // Search the database for a user with the refreshToken that was sent via HttpOnly cookie
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) return res.status(403).json({ message: 'Forbidden' }); // No user found

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      // if error or the username that was recorded in the refreshToken does not match with the username of the user we searched for with the refreshToken (something could've been tampered with!)
      if (err || foundUser.username !== decoded.username)
        return res.status(403).json({ message: 'Forbidden' });

      const accessToken = jwt.sign(
        {
          user: {
            username: foundUser.username,
            id: foundUser.id
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
      );

      res.json({ accessToken });
    })
  );
});

// @desc Logout - clears the cookie if it exists and deletes it from the associated User's doc in the db
// @route POST /auth/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({ message: 'Logout successful' });
  } // No content; request successful there was no jwt cookie
  const refreshToken = cookies.jwt;
  // Delete refreshToken in the database
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  foundUser.refreshToken = '';
  foundUser.save();
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // you need to include the same options that were part of the cookie when you made it (all except maxAge)
  res.json({ message: 'Cookie cleared' });
});

export default { login, refresh, logout };
