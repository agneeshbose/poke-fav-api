import express from "express";

const pokemonRouter = express.Router();

pokemonRouter.get("/", (req, res) => {
  res.status(200).json({ message: "successful" });
});

export { pokemonRouter };
