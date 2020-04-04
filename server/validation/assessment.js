const Joi = require('joi');

module.exports = (assessment, update) => {
    let schema = Joi.object().keys({
      patientId: Joi.number().required()
     });

    if(update) {
      schema = schema.optionalKeys("patientId");
    }
  
    return Joi.validate(assessment, schema);
}