const PatientModel = require('./../models').Patient;
const statusCodes = require("./../constants/statusCodes");
const AssessmentModel = require("./../models").Assessment;
const UserModel = require("./../models").User;
const createPatient = async (patient) => {
    try {
        const newPatient = await PatientModel.create({
            ...patient
        });
        return {statusCode: statusCodes.CREATED, success: true, data: newPatient};
    }   
    catch (err) {   
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const listPatients = async () => {   
    try{
        const patients = await PatientModel.findAll({include:['user']});
        return {statusCode: statusCodes.OK, success:true, data: patients };
    }
    catch(err) {
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
    }
}

const getPatientById = async (patientId) => {
    try {
        const patient = await PatientModel.findByPk(patientId,{
            include: ['user']
        });
        
        if(patient) {
            return {statusCode: statusCodes.OK, success:true, data: patient};
        }
        else {
            return {statusCode: statusCodes.NOT_FOUND, success:false, data: "Not FOund"}
        }
    }
    catch(err) {
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const updatePatient = async (patientId,patientUpdate) => {
    try {
        const patient = await PatientModel.findByPk(patientId);
        if(patient) {
            try {
                const updatedPatient = await patient.update( patientUpdate,{fields: Object.keys(patientUpdate) });
                return {statusCode: statusCodes.OK, success: true, data: updatedPatient };
            }
            catch (err) {
                return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};   
            }
          
        }
        else {
            return {statusCode: statusCodes.NOT_FOUND, success: true, data: "Patient Not Found"};
        }
    }
    catch (err) {
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const destroyPatient = async (patientId) => {
    try {
      const patient = await PatientModel.findByPk(patientId);
      if(patient) {
        await patient.destroy();
        return {statusCode: statusCodes.NO_CONTENT, success :true, data: "Resource Deleted"};
      }
      else {
          return {statusCode: statusCodes.NOT_FOUND, success: false, data: "Patient Not Found"};
      }
    } 
    catch (err) {
      return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
    }
}

const getPatientByUserId = async (userId) => {
    try {
        const patient = await PatientModel.findOne({
            where: {userId: userId},
            include: [{
                model: UserModel,
                as: 'user'
            }]
        });
        if(patient) {
            return {statusCode: statusCodes.OK, success:true, data: patient};
        }
        else {
            return { statusCode: statusCodes.NOT_FOUND, success:false, data: "Not Found." }
        }
    }
    catch(err) {
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}


const listPatientAssessments = async (userId) => {
    try {
        const patient = await PatientModel.findOne({
            where: {userId: userId},
            include:[{
                model: AssessmentModel,
                as: "assessments"
               }
             ],
             attributes: ['id']
        });
        
        if(patient) {
            return {statusCode: statusCodes.OK, success:true, data: patient};
        }
        else {
            return {statusCode: statusCodes.NOT_FOUND, success:true, data: "Not Found"}
        }
    }
    catch(err) {
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

module.exports = {
    createPatient,
    listPatients,
    getPatientById,
    updatePatient,
    destroyPatient,
    getPatientByUserId,
    listPatientAssessments
}