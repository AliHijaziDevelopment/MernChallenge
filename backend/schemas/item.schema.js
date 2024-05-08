const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    phoneNumber: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },

  {
    timestamps: true,
  }
);

itemSchema.virtual("phone_info", {
  ref: "PhoneInfo",
  localField: "_id",
  foreignField: "item",
  justOne: true,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
