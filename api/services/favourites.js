import Favourite from "../models/favourite.js";

const loadFavourites = async () => {
  try {
    const favourites = await Favourite.find({});
    return favourites;
  } catch (error) {
    throw new Error("Error loading favourites" + error.message);
  }
};

const saveFavourite = async (favourite) => {
  try {
    const existing = await Favourite.findOne({ name: favourite.name });
    if (existing) {
      const error = new Error("Favourite already exists");
      error.code = "DUPLICATE";
      throw error;
    }

    const newFavourite = new Favourite(favourite);
    const result = await newFavourite.save();
    return result;
  } catch (error) {
    if (error.code) {
      throw error;
    }
    throw new Error("Error saving favourite" + error.message);
  }
};

const deleteFavourite = async (name) => {
  try {
    const result = await Favourite.findOneAndDelete({ name });
    return result;
  } catch (error) {
    throw new Error("Failed to delete favourite" + error.message);
  }
};

export { loadFavourites, saveFavourite, deleteFavourite };
