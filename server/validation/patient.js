const Joi = require('joi');

module.exports = (patient, update) => {
    let schema = Joi.object().keys({
      userId: Joi.number().required(),
      location: Joi.string().min(5),
      phoneNo: Joi.string().min(11),
      isDiabetic: Joi.boolean(),
      isSmoker: Joi.boolean(),
      isHypertension: Joi.boolean(),
      isObese: Joi.boolean()
    });

    if(update) {
      schema = schema.optionalKeys("userId", "location", "phoneNo", "isDiabetic","isSmoker","isHypertension","isObese");
    }
  
    return Joi.validate(patient, schema);
}