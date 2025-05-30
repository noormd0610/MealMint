let express=require("express");
const multer  = require('multer')
let{  storage} = require("../cloudinary.js");
const upload = multer({ storage: storage });
let router=express.Router();
let wrapAsync = require("../errorHandling/wrapAsync.js");
let {isLoggedIn,isOwner,restaurantJoi} = require("../middlewares.js");
let {addRestaurant,visitRestaurant,editForm,editRestaurant,deleteRestaurant}=require("../controllers/restaurants.js");

router.route("/add")
//render add restaurants form
.get(isLoggedIn,(req, res, next) => {
  res.render("listing/addRestaurants.ejs");
})
//add restaurants 
.post(isLoggedIn,upload.single('restaurant[coverImage]'),restaurantJoi, wrapAsync(addRestaurant));

router.route("/:id")
//visit restaurant
.get(wrapAsync(visitRestaurant))
//edit restaurant 
.patch(isLoggedIn,isOwner,upload.single('restaurant[coverImage]'),restaurantJoi, wrapAsync(editRestaurant))
//delete restaurant
.delete(isLoggedIn,isOwner,wrapAsync(deleteRestaurant));


//edit form 
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(editForm))


module.exports=router;