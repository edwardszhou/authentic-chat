import { config } from 'dotenv';

import connectDB from '@/config/db';
import * as http from 'http';
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

import { Server } from 'socket.io';
import Sentiment from 'sentiment';

config();
const app = Express();
const PORT = process.env.PORT;
const server = http.createServer(app);
const sentiment = new Sentiment();
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
app.get('/test', async (req, res) => {
  res.json({ message: 'Testing' });
});
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

app.use(errorHandler);

// SOCKETIO
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user has joined');
  socket.on('message', (data) => {
    console.log(data, sentiment.analyze(data));
    socket.broadcast.emit('message', data);
  });
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
