const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the variation schema
const descriptionSchema = new Schema(
  {
    basic: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    details: {
      type: String,
      required: function () {
        return this.isNew;
      },
    },
    features: {
      type: [String],
      required: function () {
        return this.isNew;
      },
    },
    measurements: {
      type: [String],
      required: function () {
        return this.isNew;
      },
    },
  },
  { _id: false }
); // Use _id: false to prevent creating _id for each sub-document

module.exports = descriptionSchema;
