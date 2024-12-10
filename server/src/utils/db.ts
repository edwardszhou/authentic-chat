import mongoose from 'mongoose';
import { RUNTIME_ENV } from './env';

export default async function connectDB() {
  try {
    await mongoose.connect(RUNTIME_ENV.MONGO_DSN);
  } catch (err) {
    console.log(err);
  }
}
