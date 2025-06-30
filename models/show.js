const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema(
  {
    movie: { type: String, required: true, ref: "movie" },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} },
  },
  { minimize: false }
);

const SHOW = mongoose.model("show", showSchema);

module.exports = SHOW;
