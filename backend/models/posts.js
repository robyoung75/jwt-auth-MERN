import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema({
  hydration_data: {
    type: Array,
    required: true,
  },
  nutrition_data: {
    type: Array,
    required: true,
  },
  sleep_data: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", Post);
