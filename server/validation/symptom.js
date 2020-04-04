const Joi = require('joi');

module.exports = (patient, update) => {
    let schema = Joi.object().keys({
      assessmentId: Joi.number().required(),
      name: Joi.string().required()
    });

    if(update) {
      schema = schema.optionalKeys("assessmentId", "name");
    }
  
    return Joi.validate(patient, schema);
}