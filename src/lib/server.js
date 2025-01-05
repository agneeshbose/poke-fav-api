import express from "express";
import cors from "cors";
import { setupRoutes } from "../routes/index.js";
import config from "./config.js";

const startServer = () => {
  const app = express();
  const { port } = config;

  app.use(cors());
  app.use(express.json());

  setupRoutes(app);

  try {
    app.listen(port, () => {
      console.log("Started listening on port:", port);
    });
  } catch (err) {
    console.log("Failed to start the server", err);
  }
};

export { startServer };
