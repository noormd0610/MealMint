let User = require("../models/user.js");

module.exports.signUpForm = async (equal, res) => {
    res.render("user/signup.ejs");
}

module.exports.signUp=async (req, res) => {
try{
    let { username, password, email } = req.body;
    let userData = await new User({
        username,
        email
    });
    let data=await User.register(userData,password);
    req.login(data,(error)=>{
        if(error){
            return next(new ExpressError(500,error));
        }else{
            req.flash("success","Logged in successfully");
            res.redirect("/restaurants");
        }
    })
}catch(e){
  req.flash("failure",e.message);    
    res.redirect("/signup");
}
}

//logInForm
module.exports.logInForm=async(req,res)=>{
    res.render("user/login.ejs");
}

//logIn
module.exports.logIn=(req, res)=>{
      req.flash("success","Logged in successfully");
    let redirectUrl=res.locals.saveUrl||"/restaurants";
    res.redirect(redirectUrl);
}

module.exports.logOut=(req,res,next)=>{
    req.logout((error)=>{
        if(error){
            return next(new ExpressError(500,error));
        }else{
            req.flash("success","Logged out successfully");
            res.redirect("/restaurants");
        }
    })
}