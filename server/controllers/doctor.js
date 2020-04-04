const DoctorService = require("./../services").DoctorService;
const DoctorValidation = require("./../validation").DoctorValidation;

const create = async (req,res) => {
    const { err } = DoctorValidation(req.body, false);
    if(err) {
        return res  
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    try {
        req.body.userId = req.params.userId;
        const { statusCode, success, data } =  await DoctorService.createDoctor(req.body);
        return res.status(statusCode).json({ success, data });
    }
    catch(err) {
        return res.status(500).json({success: false, err: err });
    } 
}

const list = async(req,res) => {
    try {
        const { statusCode, success, data } = await DoctorService.listDoctors();
        return res.status(statusCode).json({ success,data });
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    } 
} 

const retrieve = async (req,res) => {
    const doctorId = req.params.id;
    try {
        const { statusCode, success, data} = await DoctorService.getDoctorById(doctorId);
        return res.status(statusCode).json({ success, data} );    
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const update = async (req, res) => {
    const { err } = DoctorValidation(req.body, true);
    if(err) {
        return res
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    const doctor = req.body;
    const doctorId = req.params.id;
    try {
        const { statusCode, success, data } = await DoctorService.updateDoctor(doctorId,doctor);
        return res.status(statusCode).json( {success, data } );
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const destroy = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const {statusCode, success, data } = await DoctorService.destroyDoctor(doctorId);
        return res.status(statusCode).json({ success,data });     
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const getDoctorsByLocation = async(req,res) => {
    try {
        const location = req.body.location;
        const { statusCode, success, data } = await DoctorService.listDoctorsByLocation(location);
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
    destroy,
    update,
    getDoctorsByLocation
}