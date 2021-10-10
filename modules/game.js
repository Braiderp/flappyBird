const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    score: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = model("Game", gameSchema);
