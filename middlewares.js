let Restaurant = require("./models/restaurants_mdl.js");
let restaurantsJoiSchema = require("./joi/restaurants.js");
let reviewsJoiSchema = require("./joi/reviews.js");
let ExpressError = require("./errorHandling/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("failure", "you must logged in to modify and add restaurant");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    console.log(  res.locals.saveUrl)
    res.locals.saveUrl = req.session.redirectUrl;
  }
  next()
}

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let restaurant = await Restaurant.findById(id).populate("owner");
    if(!restaurant){
  req.flash("failure", "Restaurant not found");
  return res.redirect("/restaurants");
}
   if (!restaurant.owner._id.equals(res.locals.currUser._id)) {
    req.flash("failure", "You are not authorized to this restaurant");
    return res.redirect(`/restaurant/${id}`);
  }
  next()
}

module.exports.restaurantJoi = (req, res, next) => {
  let { error } = restaurantsJoiSchema.validate(req.body);
  if (error) {
    return next(new ExpressError(404, error));
  } else {
    next();
  }
}
// Joi validation middleware
module.exports.reviewsJoi=(req, res, next)=>{
  let { error } = reviewsJoiSchema.validate(req.body);
  if (error) {
    return next(new ExpressError(400, error.details[0].message));
  } else {
    next();
  }
};
 


