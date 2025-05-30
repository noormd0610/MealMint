let Review = require("./reviews_mdl.js");
let User=require("./user.js");
let mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      "Fast Food",
      "Casual Dining",
      "Fine Dining",
      "Cafe",
      "Buffet",
      "Food Truck",
      "Street Food",
      "Tiffin center",
      "Biryani center"
    ]
  },
  foods: [
    {
      type: String,
      required: true
    }
  ],
  address: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  coverFood:{
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

restaurantSchema.post("findOneAndDelete", async (restaurant) => {
  await Review.deleteMany({ _id: { $in: restaurant.reviews } })
})

const restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurant;
