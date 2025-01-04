import { favouritesRouter } from "./favourites.js";
import { pokeRouter } from "./poke.js";

const setupRoutes = (app) => {
  app.use("/poke", pokeRouter);
  app.use("/favourites", favouritesRouter);

  app.use("*", (req, res) => {
    res.status(404).json({ status: "FAILED", message: "Resource not found" });
  });
};

export { setupRoutes };
