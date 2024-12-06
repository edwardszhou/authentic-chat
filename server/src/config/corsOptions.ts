import allowedOrigins from '@/config/allowedOrigins';

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // that second condition after the or is in case a platform doesn't offer an origin when it requests from the server
      callback(null, true); // first param is err, no err so null; second param is allowed boolean
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // sets Access-Allowed header for us
  optionsSuccessStatus: 200
};

export default corsOptions;
