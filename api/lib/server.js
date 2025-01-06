import express from "express";
import cors from "cors";
import { setupRoutes } from "../routes/index.js";
import connectDB from "./db.js";

const startServer = () => {
  const app = express();

  connectDB();
  app.use(cors());
  app.use(express.json());
  setupRoutes(app);

  return app;
};

export { startServer };
