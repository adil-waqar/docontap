const DiseaseService = require("./../services").DiseaseService;
const DiseaseValidation = require("./../validation").DiseaseValidation;

const create = async (req,res) => {
    const { err } = DiseaseValidation(req.body, false);
    if(err) {
        return res  
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    try {
        const { success, data } =  await DiseaseService.createDisease(req.body);
        return res.json({success, data});
    }
    catch(err) {
        return res.status(500).json({success: false, err: err });
    } 
}

const list = async(req,res) => {
    try {
        const { statusCode, success, data } = await DiseaseService.listDiseases();
        return res.status(statusCode).json({ success,data });
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    } 
} 

const retrieve = async (req,res) => {
    const diseaseId = req.params.id;
    try {
        const {success, data} = await DiseaseService.getDiseaseById(diseaseId);
        return res.json({ success, data} );    
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const update = async (req, res) => {
    const { err } = DiseaseValidation(req.body, true);
    if(err) {
        return res
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    const disease = req.body;
    const diseaseId = req.params.id;
    try {
        const { success, data } = await DiseaseService.updateDisease(diseaseId,disease);
        return res.json( {success, data } );
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const destroy = async (req, res) => {
    const diseaseId = req.params.id;
    try {
        const {success, data } = await DiseaseService.destroyDoctor(diseaseId);
        return res.json({success,data});     
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const getByName = async (req,res) => {
    const disease = req.body.name.toLowerCase();;
    try {
        const {statusCode, success, data} = await DiseaseService.getDiseaseByName(disease);
        return res.status(statusCode).json({ success, data} );    
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
    getByName
}