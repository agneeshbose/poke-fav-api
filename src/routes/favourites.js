import express from "express";
import { readFile, writeFile } from "fs/promises";

const favouritesRouter = express.Router();

favouritesRouter.get("/", async (req, res) => {
  try {
    const data = await readFile("src/data/favourites.json");
    res.status(200).json({ status: "OK", data: JSON.parse(data) });
  } catch (error) {
    res
      .status(500)
      .json({ status: "FAILED", message: "Internal server error" });
  }
});

favouritesRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    //Validate input : TODO
    console.log({ body });

    const data = await readFile("src/data/favourites.json");
    const favourites = JSON.parse(data);
    const { name, url } = body;

    const isPresent = favourites.some((item) => item.name === name);

    if (isPresent) {
      return res
        .status(409)
        .json({ status: "Already exists", data: favourites });
    }

    favourites.push({ name, url });
    await writeFile(
      "src/data/favourites.json",
      JSON.stringify(favourites, null, 2)
    );

    res.status(201).json({ status: "Created", data: favourites });
  } catch (error) {
    console.log({ error });

    res
      .status(500)
      .json({ status: "FAILED", message: "Internal server error" });
  }
});

favouritesRouter.delete("/:name", async (req, res) => {
  const { name } = req.params;

  const data = await readFile("src/data/favourites.json");
  const favourites = JSON.parse(data);

  const itemIndex = favourites.findIndex((item) => item.name === name);

  if (itemIndex === -1) {
    return res
      .status(409)
      .json({ status: "Resource does not exist", data: favourites });
  }

  favourites.splice(itemIndex, 1);

  await writeFile(
    "src/data/favourites.json",
    JSON.stringify(favourites, null, 2)
  );

  res.status(200).json({ status: "OK", data: favourites });
});

export { favouritesRouter };
