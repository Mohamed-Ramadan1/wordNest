import dotenv from "dotenv";

dotenv.config();

export const port: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 3000;
