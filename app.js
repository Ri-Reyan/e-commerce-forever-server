import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRouter from "./src/routes/User.routes.js";
import adminRouter from "./src/routes/Admin.routes.js";
import adminPanelRouter from "./src/routes/AdminPanel.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", adminPanelRouter);

export default app;
