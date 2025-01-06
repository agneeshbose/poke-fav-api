import mongoose from "mongoose";

const favouritesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.model("Favourite", favouritesSchema);
