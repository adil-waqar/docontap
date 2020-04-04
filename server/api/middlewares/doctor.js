const DoctorService = require("../../services").DoctorService;
const UserService = require("../../services").UserService;

const checkIfUserIsDoctor = async (req,res,next) => {
    const userId = req.params.userId;
    // console.log('User Id',userId);
    // return;
    try {
        const {a,_, data} = await UserService.getUserById(userId);
        // console.log(data);
        // return;
        if(data && data.userType == 2) {
            next();
        }
        else {
            res.status(404).json({success: false, data: "Invalid User Id."});
        }
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({success: false, message: ex});
    }
} 

const ifDoctorExist = async (req,res,next) => {
    const userId = req.params.userId || req.body.doctorId;
    console.log(userId);
    try {
        const {_, s, data} = await DoctorService.getDoctorByUserId(userId);
        if(data && data.userId) {
            res.status(404).json({success: false, data: "Doctor with the given User Id Already Exists."});
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
    ifDoctorExist,
    checkIfUserIsDoctor
}