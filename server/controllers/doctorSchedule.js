const DoctorScheduleService = require("./../services").DoctorScheduleService;
const DoctorScheduleValidation = require("./../validation").DoctorScheduleValidation;

const create = async (req,res) => {
    const { err } = DoctorScheduleValidation(req.body, false);
    if(err) {
        return res  
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    try {
        const { statusCode,  success, data } =  await DoctorScheduleService.createDoctorSchedule(req.body);
        return res.status(statusCode).json({success, data});
    }
    catch(err) {
        return res.status(500).json({success: false, err: err });
    } 
}

const list = async(req,res) => {
    try {
        const {  statusCode, success, data } = await DoctorScheduleService.listDoctorSchedules();
        return res.status(statusCode).json({ success,data });
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    } 
} 

const retrieve = async (req,res) => {
    const doctorScheduleId = req.params.id;
    try {
        const {  statusCode, success, data} = await DoctorScheduleService.getScheduleById(doctorScheduleId);
        return res.status(statusCode).json({ success, data} );    
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const update = async (req, res) => {
    const { err } = DoctorScheduleValidation(req.body, true);
    if(err) {
        return res
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    const doctorSchedule = req.body;
    const doctorScheduleId = req.params.id;
    try {
        const {  statusCode, success, data } = await DoctorScheduleService.updateSchedule(doctorScheduleId,doctorSchedule);
        return res.status(statusCode).json( {success, data } );
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const destroy = async (req, res) => {
    const doctorScheduleId = req.params.id;
    try {
        const {  statusCode, success, data } = await DoctorScheduleService.destroySchedule(doctorScheduleId);
        return res.status(statusCode).json({success,data});     
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

module.exports = {
    create,
    retrieve,
    list,
    destroy,
    update
}