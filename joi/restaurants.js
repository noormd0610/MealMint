 const Joi = require('joi');

const restaurantsJoiSchema = Joi.object({
  restaurant: Joi.object({
    name: Joi.string().required(),        // Add this
    type: Joi.string().required(),
    coverFood: Joi.string().required(),
    foods: Joi.string().required(),       // Add this
    price: Joi.string().required(),
    address: Joi.string().required(),
    distance: Joi.string().required()
  }).required()
});

module.exports = restaurantsJoiSchema;
