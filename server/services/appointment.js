const AppointmentModel = require('./../models').Appointment;
const AssessmentModel = require('./../models').Assessment;
const DoctorModel = require('./../models').Doctor;
const UserModel = require('./../models').User;
const ConditionModel = require('./../models').Condition;
const SymptomModel = require('./../models').Symptom;
const PatientModel = require('./../models').Patient;
const statusCodes = require('./../constants/statusCodes');

const createAppointment = async (appointment) => {
  try {
    const newAppointment = await AppointmentModel.create({
      ...appointment,
    });
    return { success: true, data: newAppointment };
  } catch (err) {
    return { success: false, data: err };
  }
};

const listAppointments = async () => {
  try {
    const appointments = await AppointmentModel.findAll();
    return { success: true, data: appointments };
  } catch (err) {
    return { success: false, data: err };
  }
};

const getAppointmentById = async (appointmentId) => {
  try {
    const appointment = await AppointmentModel.findByPk(appointmentId);
    if (appointment) {
      return { success: true, data: appointment };
    } else {
      return { success: true, message: 'Not FOund' };
    }
  } catch (err) {
    return { success: false, data: err };
  }
};

const updateAppointment = async (appointmentId, appointmentUpdate) => {
  try {
    const appointment = await AppointmentModel.findByPk(appointmentId);
    if (appointment) {
      try {
        const updatedAppointment = await appointment.update(appointmentUpdate, {
          fields: Object.keys(appointmentUpdate),
        });
        return {
          statusCode: statusCodes.OK,
          success: true,
          data: updatedAppointment,
        };
      } catch (err) {
        return {
          statusCode: statusCodes.BAD_REQUEST,
          success: false,
          data: err,
        };
      }
    } else {
      return {
        statusCode: statusCodes.NOT_FOUND,
        success: false,
        data: 'Appointment Not Found',
      };
    }
  } catch (err) {
    console.log(err);
    return { success: false, data: err };
  }
};

const destroyAppointment = async (appointmentId) => {
  try {
    const appointment = await AppointmentModel.findByPk(appointmentId);
    if (appointment) {
      await appointment.destroy();
      return { success: true, data: 'Resource Deleted' };
    } else {
      return { success: false, data: 'Appointment Not Found' };
    }
  } catch (err) {
    return { success: false, data: err };
  }
};

const getPatientAppointments = async (patientId) => {
  try {
    const appointment = await AppointmentModel.findAll({
      where: { patientId: patientId },
      include: [
        {
          model: DoctorModel,
          as: 'doctor',
          attributes: [
            'id',
            'userId',
            'fee',
            'hospital',
            'qualification',
            'specialization',
            'rating',
          ],
          include: [{ model: UserModel, as: 'user' }],
        },
        {
          model: AssessmentModel,
          as: 'assessment',
          attributes: ['id', 'createdAt'],
          include: [
            {
              model: ConditionModel,
              as: 'conditions',
            },
            {
              model: SymptomModel,
              as: 'symptoms',
            },
          ],
        },
      ],
      attributes: ['id', 'time', 'status'],
    });
    if (appointment) {
      return { statusCode: statusCodes.OK, success: true, data: appointment };
    } else {
      return {
        statusCode: statusCodes.NOT_FOUND,
        success: true,
        message: 'Not Found',
      };
    }
  } catch (err) {
    return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
  }
};

// const getDoctorAppointments = async patientId => {
//     try {
//       const appointment = await AppointmentModel.findAll({
//         where: { doctorId: patientId },
//         include: [
//           {
//             model: DoctorModel,
//             as: 'doctor',
//             attributes: [
//               'id',
//               'userId',
//               'fee',
//               'hospital',
//               'qualification',
//               'specialization',
//               'rating'
//             ],
//             include: [{ model: UserModel, as: 'user' }]
//           },
//           {
//             model: AssessmentModel,
//             as: 'assessment',
//             attributes: ['id', 'createdAt'],
//             include: [
//               {
//                 model: ConditionModel,
//                 as: 'conditions'
//               },
//               {
//                 model: SymptomModel,
//                 as: 'symptoms'
//               }
//             ]
//           }
//         ],
//         attributes: ['id', 'time', 'status']
//       });
//       if (appointment) {
//         return { statusCode: statusCodes.OK, success: true, data: appointment };
//       } else {
//         return {
//           statusCode: statusCodes.NOT_FOUND,
//           success: true,
//           message: 'Not Found'
//         };
//       }
//     } catch (err) {
//       return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
//     }
//   };

const getDoctorAppointments = async (patientId) => {
  try {
    const appointment = await AppointmentModel.findAll({
      where: { doctorId: patientId },
      include: [
        {
          model: PatientModel,
          as: 'patient',
          attributes: ['id', 'userId', 'location', 'phoneNo'],
          include: [{ model: UserModel, as: 'user' }],
        },
        {
          model: AssessmentModel,
          as: 'assessment',
          attributes: ['id', 'createdAt'],
          include: [
            {
              model: ConditionModel,
              as: 'conditions',
            },
            {
              model: SymptomModel,
              as: 'symptoms',
            },
          ],
        },
      ],
      attributes: ['id', 'time', 'status'],
    });
    if (appointment) {
      return { statusCode: statusCodes.OK, success: true, data: appointment };
    } else {
      return {
        statusCode: statusCodes.NOT_FOUND,
        success: true,
        message: 'Not Found',
      };
    }
  } catch (err) {
    return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
  }
};

module.exports = {
  createAppointment,
  listAppointments,
  getAppointmentById,
  updateAppointment,
  destroyAppointment,
  getPatientAppointments,
  getDoctorAppointments,
};
