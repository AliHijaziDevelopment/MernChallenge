const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const phoneInfoSchema = new Schema(
  {
    countryCode: { type: String, required: true },
    countryName: { type: String, required: true },
    operatorName: { type: String, required: true },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "phone_info",
  }
);

const PhoneInfo = mongoose.model("PhoneInfo", phoneInfoSchema);

module.exports = PhoneInfo;
