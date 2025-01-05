import express from "express";

import { loadFavourites, saveFavourites } from "../services/favourites.js";

const favouritesRouter = express.Router();

favouritesRouter.get("/", async (req, res) => {
  try {
    const favourites = await loadFavourites();
    res.status(200).json({ status: "OK", data: favourites });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal server error" });
  }
});

favouritesRouter.post("/", async (req, res) => {
  try {
    const { body } = req;

    if (!body?.name || !body?.url) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid input. 'name' and 'url' are required.",
      });
    }

    const { name, url } = body;
    const favourites = await loadFavourites();
    const isAlreadyPresent = favourites.some((item) => item.name === name);

    if (isAlreadyPresent) {
      return res
        .status(409)
        .json({ status: "FAILED", message: "Item already exists" });
    }

    favourites.push({ name, url });
    await saveFavourites(favourites);

    res.status(201).json({ status: "CREATED", data: favourites });
  } catch (error) {
    console.log({ error });

    res
      .status(500)
      .json({ status: "FAILED", message: "Internal server error" });
  }
});

favouritesRouter.delete("/:name", async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid input. 'name' parameter is required.",
      });
    }

    const favourites = await loadFavourites();
    const itemIndex = favourites.findIndex((item) => item.name === name);

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Resource not found" });
    }

    favourites.splice(itemIndex, 1);
    await saveFavourites(favourites);

    res.status(200).json({ status: "OK", data: favourites });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: "FAILED",
      message: "Internal server error.",
    });
  }
});

export { favouritesRouter };
