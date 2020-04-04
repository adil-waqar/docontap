const ConditionService = require("./../services").ConditionService;
const ConditionValidation = require("./../validation").ConditionValidation;

const create = async (req,res) => {
    const { err } = ConditionValidation(req.body, false);
    if(err) {
        return res  
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    try {
        const {statusCode,  success, data } =  await ConditionService.createCondition(req.body);
        return res.status(statusCode).json({success, data});
    }
    catch(err) {
        return res.status(500).json({success: false, err: err });
    } 
}

const list = async(req,res) => {
    try {
        const {statusCode, success, data } = await ConditionService.listConditions();
        return res.status(statusCode).json({ success,data });
    }
    catch(err) {
        return res.status(500).json({ success: false, err:err });
    } 
} 

const retrieve = async (req,res) => {
    const conditionId = req.params.id;
    try {
        const {statusCode, success, data} = await ConditionService.getConditionById(conditionId);
        return res.status(statusCode).json({success, data} );    
    }
    catch(err) {
        return res.status(500).json({ success: false, err:err });
    }
}

const update = async (req, res) => {
    const { err } = ConditionValidation(req.body, true);
    if(err) {
        return res
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    const condition = req.body;
    const conditionId = req.params.id;
    try {
        const {statusCode, success, data } = await ConditionService.updateCondition(conditionId,condition);
        return res.status(statusCode).json( { success, data } );
    }
    catch(err) {
        return res.status(500).json({ success: false, err:err });
    }
}

const destroy = async (req, res) => {
    const conditionId = req.params.id;
    try {
        const { statusCode, success, data } = await ConditionService.destroyCondition(conditionId);
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
    update,
    destroy
}