const Joi = require('joi');

module.exports = (assessment, update) => {
    let schema = Joi.object().keys({
      assessmentId: Joi.number().required(),
      name: Joi.string().required(),
      probability: Joi.number().required()
     });

    if(update) {
      schema = schema.optionalKeys("assessmentId","name","probability");
    }
  
    return Joi.validate(assessment, schema);
}