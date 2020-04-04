const Joi = require('joi');

module.exports = (doctorSchedule, update) => {
    let schema = Joi.object().keys({
      doctorId: Joi.number().required(),
      day: Joi.string().required(),
      from: Joi.date().required(),
      to: Joi.date().required()
    });

    if(update) {
      schema = schema.optionalKeys("doctorId","day","from","to");
    }
  
    return Joi.validate(doctorSchedule, schema);
}