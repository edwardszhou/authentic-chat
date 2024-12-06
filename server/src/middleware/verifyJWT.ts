import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log(authHeader); // Will print "Bearer [the token]"

  const token = authHeader.split(' ')[1]; // To separate the token value from "Bearer"

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // decoded holds the now-decoded information held inside of the JWT (in our case, username)
    if (err) return res.status(403).json({ message: 'Forbidden' }); // invalid token
    req.user = decoded.user.username;
    next();
  });
};

export default verifyJWT;
