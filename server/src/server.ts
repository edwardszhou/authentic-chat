import { config } from 'dotenv';

import connectDB from '@/config/db';
import Express from 'express';
import mongoose from 'mongoose';

import authRouter from '@/routes/authRoutes';
import usersRouter from '@/routes/userRoutes';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from '@/config/corsOptions';
import errorHandler from '@/middleware/errorHandler';
import { logger } from '@/middleware/logger';
import verifyJWT from '@/middleware/verifyJWT';

config();
const app = Express();
const PORT = process.env.PORT;

// MIDDLEWARE

app.use(Express.urlencoded({ extended: false }));

app.use(logger);
app.use(Express.json()); // allows app to receive and parse JSON data
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'Hello!' });
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use(verifyJWT); // everything below this will have to go through verifying the JWT first

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

connectDB();

app.get('/test', async (req, res) => {
  res.json({ message: 'Hello' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
