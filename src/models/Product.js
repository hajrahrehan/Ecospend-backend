const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: String,
    type: String,
    name: { type: String, required: true },
    description: String,
    price: Number,
    image: { type: String, default: "" },
    currency: { type: String, default: "PKR" },
    status: { type: String, default: "active" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", ProductSchema);
