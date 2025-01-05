import express from "express";
import { pokeApiClient } from "../lib/poke-api-client.js";

const pokeRouter = express.Router();

pokeRouter.get("*", async (req, res) => {
  const { method, params, body, path, query } = req;

  try {
    const response = await pokeApiClient({
      method: method,
      url: path,
      params: { ...params, ...query },
      data: body,
    });

    res.status(200).json({ status: "OK", data: response });
  } catch (error) {
    const { message, status = 500 } = error;
    res.status(status).json({ status: "FAILED", message });
  }
});

export { pokeRouter };
