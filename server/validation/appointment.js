const Joi = require('joi');

module.exports = (appointment, update) => {
    let schema = Joi.object().keys({
      patientId: Joi.number().required(),
      doctorId: Joi.number().required(),
      assessmentId: Joi.number().required(),
      time: Joi.string().required(),
      status: Joi.string().required()
    });

    if(update) {
      schema = schema.optionalKeys("patientId", "doctorId", "assessmentId", "time","status");
    }
  
    return Joi.validate(appointment, schema);
}