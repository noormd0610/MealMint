let restaurant=require("../models/restaurants_mdl.js");
let restaurantsData=require("../data/restaurants.js");
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mealmint');
} 

async function insertData(){
// restaurantsData=restaurantsData.map((obj)=>({...obj,owner:"682fdec620b300159904eb32"}));
let res=await restaurant.insertMany(restaurantsData);
res.type= "Biryani center";
await res.save();
console.log("Data inserted");
}
insertData();




