const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailsSchema = new Schema(
  {
    companyPhone: [Number],
    companyAddress: [String],
    companyEmail: {
      type:String,
      required: true
    },
    fbLink: [String],
    instaLink: [String],
    twitterLink: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("details", DetailsSchema);
