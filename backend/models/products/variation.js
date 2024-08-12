const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the variation schema
const variationSchema = new Schema(
  {
    color: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    stock: {
      type: Number,
      required: function () {
        return this.isNew;
      },
    },
    price: {
      type: Number,
      required: function () {
        return this.isNew;
      },
    },
  },
  { _id: false }
); // Use _id: false to prevent creating _id for each sub-document

module.exports = variationSchema;
