import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DSN!);
  } catch (err) {
    console.log(err);
  }
}
