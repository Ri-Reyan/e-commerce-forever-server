import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRouter from "./src/routes/User.routes.js";
import adminRouter from "./src/routes/Admin.routes.js";
import adminPanelRouter from "./src/routes/AdminPanel.routes.js";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-forever-client.onrender.com",
  "https://e-commerce-forever-client.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", adminPanelRouter);

export default app;
