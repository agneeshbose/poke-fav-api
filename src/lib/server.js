import express from "express";
import { setupRoutes } from "../routes/index.js";

const startServer = () => {
  const app = express();
  const port = process.env.PORT || 4000;

  setupRoutes(app);

  try {
    app.listen(port, () => {
      console.log("Started listening on port: ", port);
    });
  } catch (err) {
    console.log("Failed to start the server", err);
  }
};

export { startServer };
