const PatientService = require("../../services").PatientService;
const UserService = require("../../services").UserService;

const checkIfUserIsPatient = async (req,res,next) => {
    const userId = req.params.userId;
    try {
        const {_, data} = await UserService.getUserById(userId);
        if(data && data.userType == 1) {
            next();
        }
        else {
            res.status(500).json({success: false, message: "Invalid User Id."});
        }
    }
    catch (ex) {
        res.status(500).json({success: false, message: ex});
    }
}

const checkPatient = async (userId) => {
    try {
        const {_, s, data} = await PatientService.getPatientById(userId);
        if(data && data.userId) {
            return true
        }
        else {
            return false
        }
    }
    catch (ex) {
        return false;
    }
}

const ifPatientDoesExist = async (req,res,next) => {
    const userId = req.params.patientId;
    try {
        const patientExist = await checkPatient(userId)
        if( patientExist ) {
            next();
        }
        else {
            res.status(404).json({success: false, message: "Patient with the given Id Does Not Exist."});
        }
    }
    catch (ex) {
        res.status(500).json({success: false, message: ex});
    }
}

const ifPatientExist = async (req,res,next) => {
    const userId = req.params.userId;
    try {
        const {_, s, data} = await PatientService.getPatientByUserId(userId);
        if(data && data.userId) {
            res.status(404).json({success: false, message: "Patient with the given User Id Already Exists."});
        }
        else {
            next();
        }
    }
    catch (ex) {
        res.status(500).json({success: false, message: ex});
    }
} 

module.exports = {
    ifPatientExist,
    checkIfUserIsPatient,
    ifPatientDoesExist
}