import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DSN);
  } catch (err) {
    console.log(err);
  }
}
