import express, { Application } from "express";

// routes imports
import userRouter from "./features/users/routes/users.routes";

const app: Application = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);

export default app;
