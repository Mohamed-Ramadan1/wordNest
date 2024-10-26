import dotenv from "dotenv";
// Load environment variables
dotenv.config();
export const DB = process.env.DATABASE as string;

// connect to  database function
