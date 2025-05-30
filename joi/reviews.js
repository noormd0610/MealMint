 const Joi = require('joi');

const  reviewsJoiSchema = Joi.object({
  review: Joi.object({
    username: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
  }).required()
});

module.exports =  reviewsJoiSchema;
