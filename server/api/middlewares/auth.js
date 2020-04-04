const jwt = require("jsonwebtoken");
const statusCodes = require("./../../constants/statusCodes");

const auth = (req,res,next) => {
    const token = req.header("x-auth-token");
    if(!token) {
        return res.status(statusCodes.UNAUTHORIZED).json({success:false, data: "Please Provide Authorization Token."});
    }
    try {
        const decoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(statusCodes.BAD_REQUEST).json({success: false, data: "The Authorization token is not valid."});
    }
} 

module.exports = {
    auth
};