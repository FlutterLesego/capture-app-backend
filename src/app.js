import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

// Middleware
import { cors } from "./middleware/cors.js";

// Routes
import teammateRouter from "./features/app/teammates/routes/teammateRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors([
    "http://localhost:3000",
    "https://capture-app-frontend.vercel.app", //adjust once we deploy
  ])
);
app.use(express.json());

app.use("/v1/teammates", teammateRouter);

export { app };
