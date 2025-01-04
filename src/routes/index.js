import { favouritesRouter } from "./favourites.js";
import { pokemonRouter } from "./pokemon.js";

const setupRoutes = (app) => {
  app.use("/pokemon", pokemonRouter);
  app.use("/favourites", favouritesRouter);
};

export { setupRoutes };
