let Restaurant = require("../models/restaurants_mdl.js");
let ExpressError = require("../errorHandling/ExpressError.js");
const mongoose = require('mongoose');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
let MAPBOX_TOKEN = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_TOKEN});

//addRestaurant
module.exports.addRestaurant=async (req, res, next) => {
  let location= req.body.restaurant.address;
  let geoResponse=await geocodingClient.forwardGeocode({
  query: location,
  limit: 1
})
.send()
let geoCordinates=geoResponse.body.features[0].geometry
  let Restaurant_Data = new Restaurant(req.body.restaurant);
  Restaurant_Data.owner= await req.user._id;
  Restaurant_Data.geometry=geoCordinates;
  let{path}=req.file;
  Restaurant_Data.coverImage =path
  let data=await Restaurant_Data.save();
  console.log(data);
  if (!data) {
    return next(new ExpressError(404, "Restaurant not found"));
  }
  req.flash("success", "Restaurant added successfully");
  res.redirect("/restaurants");
}

//visitRestaurant
module.exports.visitRestaurant=async (req, res, next) => {
  let { id } = req.params;
  let restaurant = await Restaurant.findById(id).populate({
    path:"reviews",
    populate:{
      path:"createdBy"
    }
  })
  .populate("owner");
  if(!restaurant){
    req.flash("failure","Restaurant not found");
     return res.redirect("/restaurants");
  }else{
    res.render("listing/restaurant.ejs", { restaurant });
  }
}

//editForm
module.exports.editForm=async (req, res, next) => {
  let { id } = req.params;
  res.render("listing/restaurant_edit.ejs", { restaurant });
}

//editRestaurant
module.exports.editRestaurant=async(req, res, next) => {
let { id } = req.params;
let{path}=req.file;
let restaurant=await Restaurant.findByIdAndUpdate(id, req.body.restaurant, { runValidators: true, new: true });
restaurant.coverImage = path;
await restaurant.save();
req.flash("success", "Restaurant updated successfully");
  res.redirect(`/restaurant/${id}`);
}

//deleteRestaurant
module.exports.deleteRestaurant=async (req, res, next) => {
   let { id } = req.params;
  let data = await Restaurant.findByIdAndDelete(id);
  req.flash("failure", "Restaurant deleted successfully");
  if (!data) {
    return next(new ExpressError(404, "Restaurant not found"));
  }
  res.redirect("/restaurants");
}