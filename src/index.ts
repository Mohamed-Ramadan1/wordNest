import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { DB } from "./config/database.config";

const app = express();
const port = 3000;

mongoose.connect(DB).then(() => {
  console.log("Database is connected");
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
