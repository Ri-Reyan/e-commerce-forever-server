import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRouter from "./src/routes/User.routes.js";
import adminRouter from "./src/routes/Admin.routes.js";
import adminPanelRouter from "./src/routes/AdminPanel.routes.js";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = (process.env.CORS_URI || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api", userRouter);
app.use("/api", adminRouter);
app.use("/api", adminPanelRouter);

export default app;
