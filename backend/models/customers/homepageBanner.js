const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homepageBannerSchema = new Schema(
  {
    bannerMobile: {
      type: String,
      required: true,
    },
    bannerDesktop: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    displayTag: {
      type: String, // category, theme, just the product you want to show in the landing page
    },
  },
  { timestamps: true }
);

const HomepageBanner = mongoose.model("HomepageBanner", homepageBannerSchema);
module.exports = HomepageBanner;
