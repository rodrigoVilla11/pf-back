const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    type: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
    },
    weight: {
      type: "number",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Delivery", deliverySchema);
