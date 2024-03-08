const mongoose = require("mongoose");
const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  is_drink: {
    type: Boolean,
    default: false, // Default value for a Boolean should be `false` or `true`, not `0`
  },
  is_avail: {
    type: Boolean, // Corrected from `typeof: Boolean`
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "sour", "spicy"],
    required: true,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  numSale: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
module.exports = MenuItem;
