const Joi = require('joi');

module.exports = (user, update) => {
    
    let schema = Joi.object().keys({
      name: Joi.string().min(5).max(50).required(),
      userType: Joi.string().min(5).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      dob: Joi.date().required()
    });

    if(update) {
      schema = schema.optionalKeys("name", "email", "password", "dob");
    }
  
    return Joi.validate(user, schema);
}