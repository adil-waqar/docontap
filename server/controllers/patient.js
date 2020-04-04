const PatientService = require("./../services").PatientService;
const PatientValidation = require("./../validation").PatientValidation;
const AssessmentService = require('../services').AssessmentService;

const create = async (req,res) => {
    const { err } = PatientValidation(req.body, false);
    if(err) {
        return res  
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    try {
        req.body.userId = req.params.userId;
        const {statusCode,  success, data } =  await PatientService.createPatient(req.body);
        return res.status(statusCode).json({success, data});
    }
    catch(err) {;
        return res.status(500).json({success: false, err: err });
    }

}

const list = async(req,res) => {
    try {
        const {statusCode, success, data } = await PatientService.listPatients();
        return res.status(statusCode).json({ success,data });
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    } 
} 

const retrieve = async (req,res) => {
    const patientId = req.params.id;
    try {
        const {statusCode, success, data} = await PatientService.getPatientById(patientId);
        return res.status(statusCode).json({success, data} );    
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const update = async (req, res) => {
    const { err } = PatientValidation(req.body, true);
    if(err) {
        return res
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    const patient = req.body;
    const patientId = req.params.id;
    try {
        const {statusCode, success, data } = await PatientService.updatePatient(patientId,patient);
        return res.status(statusCode).json( {success, data } );
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const destroy = async (req, res) => {
    const patientId = req.params.id;
    try {
        const {statusCode, success, data } = await PatientService.destroyPatient(patientId);
        return res.status(statusCode).json({success,data});     
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const assessmentlist = async(req,res) => {
    const userId = req.params.id;
    try {
        const {statusCode, success, data } = await AssessmentService.getAssessmentsByPatientId(userId);
        return res.status(statusCode).json({ success,data });
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
} 

module.exports = {
    create,
    retrieve,
    list,
    update,
    destroy,
    assessmentlist
}