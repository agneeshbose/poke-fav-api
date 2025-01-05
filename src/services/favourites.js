import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const favouritesFilePath = path.resolve(__dirname, "../data/favourites.json");

const loadFavourites = async () => {
  try {
    const data = await readFile(favouritesFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load favourites.");
  }
};

const saveFavourites = async (favourites) => {
  try {
    await writeFile(
      favouritesFilePath,
      JSON.stringify(favourites, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save favourites.");
  }
};

export { loadFavourites, saveFavourites };
