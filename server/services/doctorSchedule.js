const DoctorScheduleModel = require('./../models').DoctorSchedule;
const statusCodes = require('./../constants/statusCodes');

const createDoctorSchedule = async (doctorSchedule) => {
    try {
        const newDoctorSchedule = await DoctorScheduleModel.create({
            ...doctorSchedule
        });
        return {statusCode: statusCodes.CREATED, success: true, data: newDoctorSchedule};
    }   
    catch (err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const listDoctorSchedules = async () => {   
    try{
        const doctorSchedules = await DoctorScheduleModel.findAll();
        return { statusCode: statusCodes.OK, success:true, data: doctorSchedules };
    }
    catch(err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
    }
}


const getDoctorScheduleById = async (doctorScheduleId) => {
    try {
        const doctorSchedule = await DoctorScheduleModel.findByPk(doctorScheduleId);
        if(doctorSchedule) {
            return {statusCode: statusCodes.OK, success:true, data: doctorSchedule};
        }
        else {
            return {statusCode: statusCodes.NOT_FOUND, success:true, data: "Not Found"}
        }
    }
    catch(err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const updateDoctorSchedule = async (doctorScheduleId,doctorScheduleUpdate) => {
    try {
        const doctorSchedule = await DoctorScheduleModel.findByPk(doctorScheduleId);
        if(doctorSchedule) {
            try {
                const updatedDoctorSchedule = await doctorSchedule.update( doctorScheduleUpdate,{fields: Object.keys(doctorScheduleUpdate) });
                return { statusCode: statusCodes.OK, success: true, data: updatedDoctorSchedule };
            }
            catch (err) {
                return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};   
            }
          
        }
        else {
            return { statusCode: statusCodes.NOT_FOUND, success: true, data: "Doctor Schedule Not Found"};
        }
    }
    catch (err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}


const destroyDoctorSchedule = async (doctorScheduleId) => {
    try {
      const doctorSchedule = await DoctorScheduleModel.findByPk(doctorScheduleId);
      if(doctorSchedule) {
        await doctorSchedule.destroy();
        return {statusCode: statusCodes.OK, success :true, data: "Resource Deleted"};
      }
      else {
          return {statusCode: statusCodes.NOT_FOUND, success: false, data: "Doctor Schedule Not Found"};
      }
    } 
    catch (err) {
      return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
    }
}

module.exports = {
    createDoctorSchedule,
    listDoctorSchedules,
    getDoctorScheduleById,
    updateDoctorSchedule,
    destroyDoctorSchedule
}