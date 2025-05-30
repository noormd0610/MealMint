const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User=require("./user.js");
const reviewSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
