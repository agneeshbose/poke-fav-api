import express from "express";

import {
  deleteFavourite,
  loadFavourites,
  saveFavourite,
} from "../services/favourites.js";

const favouritesRouter = express.Router();

favouritesRouter.get("/", async (req, res) => {
  try {
    const favourites = await loadFavourites();
    return res.status(200).json({ status: "OK", data: favourites });
  } catch (error) {
    console.error(error);
    return res
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
    const favourite = await saveFavourite({ name, url });

    res.status(201).json({ status: "CREATED", data: favourite });
  } catch (error) {
    console.error(error);

    if (error.code === "DUPLICATE") {
      return res.status(409).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ status: "FAILED", message: "Internal server error" });
    }
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

    const result = await deleteFavourite(name);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Resource not found" });
    }

    res
      .status(200)
      .json({ status: "OK", message: "Favourite deleted successfully" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ status: "FAILED", message: "Internal server error" });
  }
});

export { favouritesRouter };
