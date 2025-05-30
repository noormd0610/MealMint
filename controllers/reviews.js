const Restaurant = require("../models/restaurants_mdl.js");
let Review = require("../models/reviews_mdl.js");

//addReview
module.exports.addReview=async (req, res) => {
  let { id } = req.params;
  let restaurant = await Restaurant.findById(id);
  let review = new Review(req.body.review);
  review.createdBy = req.user._id;
  restaurant.reviews.push(review);
  await review.save();
  await restaurant.save();
  res.redirect(`/restaurant/${id}`);
}

//deleteReview
module.exports.deleteReview=async (req, res) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId).populate("createdBy");
  if (req.user.id !==review.createdBy.id) {
    req.flash("failure", "you are not the owner for this review");
    return res.redirect(`/restaurant/${id}`);
  }
  await Review.findByIdAndDelete(reviewId);
  await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  res.redirect(`/restaurant/${id}`);
}