import dotenv from "dotenv";
import mongoose from "mongoose";
// Load environment variables
dotenv.config();
const DB = process.env.DATABASE as string;

// connect to  database function
export async function connectDatabase() {
  try {
    mongoose.connect(DB).then(() => {
      console.log("Database connected");
    });
  } catch (err: any) {
    console.error(err.message);
  }
}
