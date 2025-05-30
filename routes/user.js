let express = require("express");
let router = express.Router();
let passport = require("passport");
const wrapAsync = require("../errorHandling/wrapAsync.js");
let {saveUrl} = require("../middlewares.js");
let{signUp,signUpForm,logInForm,logIn,logOut}=require("../controllers/users.js");

router.route("/signUp")
//signUpForm
.get(wrapAsync(signUpForm))
//signUp
.post(wrapAsync(signUp))

router.route("/login")
// logInForm
.get(wrapAsync(logInForm))
//logIn
.post(saveUrl,passport.authenticate('local', { failureRedirect:'/login' ,failureFlash:true }),logIn);

//logOut
router.get("/logout",logOut)

module.exports = router;