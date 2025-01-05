import express from "express";
import cors from "cors";
import { setupRoutes } from "../routes/index.js";

const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  setupRoutes(app);

  return app;
};

export { startServer };
