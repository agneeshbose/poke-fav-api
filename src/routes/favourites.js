import express from "express";

const favouritesRouter = express.Router();

favouritesRouter.get("/", (req, res) => {
  res.status(200).json({ message: "successful" });
});

export { favouritesRouter };
