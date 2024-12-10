import { logEvents } from '@/middleware/logger';
import expressRateLimit from 'express-rate-limit';

const loginLimiter = expressRateLimit({
  windowMs: 60 * 1000, // time limit for login: 1 minute
  max: 5, // limit each IP to 5 login requests per 'window' per minute
  message: {
    message: 'Too many login attempts from this IP, please try again after a 60 second pause'
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      'errLog.log'
    );
    res.status(options.statusCode).send(options.message);
  },
  // setting standard and legacy headers recommended in the documentation for this middleware
  standardHeaders: true, // return rate limit info in the 'RateLImit-*' headers
  legacyHeaders: false // disable the 'X-RateLimit-*' headers
});

export default loginLimiter;
