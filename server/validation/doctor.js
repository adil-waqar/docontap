const Joi = require('joi');

module.exports = (doctor, update) => {
    let schema = Joi.object().keys({
      userId: Joi.number().required(),
      fee: Joi.number().required(),
      hospital: Joi.string().min(5).required(),
      qualification: Joi.string().required(),
      specialization: Joi.string().required(),
      rating: Joi.number(),
    });

    if(update) {
      schema = schema.optionalKeys("userId", "fee", "hospital", "qualification","specialization","rating");
    }
  
    return Joi.validate(doctor, schema);
}