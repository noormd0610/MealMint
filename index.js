if(process.env.NODE_ENV!=="production"){
  require("dotenv").config();
}
let db_atlas=process.env.DB_ATLAS;
let express = require("express");
let app = express();
let path = require("path");
const mongoose = require('mongoose');
let engine = require('ejs-mate');
let methodOverride = require('method-override');
//routes-->files
let restaurantRoutes = require("./routes/restaurant.js");
let reviewRoutes = require("./routes/reviews.js");
let userRoutes = require("./routes/user.js");
//user-->model
let User = require("./models/user.js");

//cookieParser
let cookieParser = require('cookie-parser')
app.use(cookieParser("secret"));

//session
let session = require('express-session');
const MongoStore = require('connect-mongo');
let store=MongoStore.create({
    mongoUrl:db_atlas,
  secret:process.env.SECRET,
  touchAfter: 24 * 3600 // time period in seconds
  })


let sessionOption = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: new Date() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  },
}
app.use(session(sessionOption))

//flash
let flash = require('connect-flash');
app.use(flash());

// passport
let passport = require('passport');
let LocalStrategy = require('passport-local');
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//mongoose db connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(db_atlas);
}

// App setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
let Restaurant = require("./models/restaurants_mdl.js");
let restaurantsJoiSchema = require("./joi/restaurants.js");
let ExpressError = require("./errorHandling/ExpressError.js");
const exp = require("constants");
const wrapAsync = require("./errorHandling/wrapAsync.js");

//flash-middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.error = req.flash("error");
  res.locals.currUser= req.user;
 
  next();
})
 

// ROUTES
app.get("/map",(req,res)=>{
  res.render("listing/map.ejs");
})
app.get("/mealmint", (req, res) => {
  res.render("listing/mealmint.ejs");
});

app.get("/restaurants", wrapAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find({});
  res.render("listing/restaurants.ejs", { restaurants });
}));


//restaurant routes
app.use("/restaurant", restaurantRoutes);

//reviews routes
app.use("/restaurant/:id/review", reviewRoutes);

//user routes
app.use("/", userRoutes);

// ERROR HANDLING
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("listing/error.ejs", { message });
});

// 404 Page
app.use((req, res) => {
  res.status(404).render("listing/404.ejs");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
