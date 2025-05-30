let express = require("express");
let router = express.Router({ mergeParams: true });
let wrapAsync = require("../errorHandling/wrapAsync.js");
let { isLoggedIn, reviewsJoi } = require("../middlewares.js");
let{addReview,deleteReview}=require("../controllers/reviews.js");


// Add review
router.post("/", isLoggedIn, reviewsJoi, wrapAsync(addReview));

// Delete review
router.delete("/:reviewId", isLoggedIn, wrapAsync(deleteReview));

module.exports = router;