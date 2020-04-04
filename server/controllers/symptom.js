const SymptomService = require("./../services").SymptomService;
const SymptomValidation = require("./../validation").SymptomValidation;

const create = async (req,res) => {
    const { err } = SymptomValidation(req.body, false);
    if(err) {
        return res  
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    try {
        console.log("Here");
        const { success, data } =  await SymptomService.createSymptom(req.body);
        return res.json({success, data});
    }
    catch(err) {
        return res.status(500).json({success: false, err: err });
    } 
}

const list = async(req,res) => {
    try {
        const { success, data } = await SymptomService.listSymptoms();
        return res.json({ success,data });
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    } 
} 

const retrieve = async (req,res) => {
    const symptomId = req.params.id;
    try {
        const {success, data} = await SymptomService.getSymptomById(symptomId);
        return res.json({ success, data} );    
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const update = async (req, res) => {
    const { err } = SymptomValidation(req.body, true);
    if(err) {
        return res
        .status(500)
        .json({ success: false, err: err.details[0].message });
    }
    const symptom = req.body;
    const symptomId = req.params.id;
    try {
        const { success, data } = await SymptomService.updateSymptom(symptomId,symptom);
        return res.json( {success, data } );
    }
    catch(err) {
        return res.status(500).json({success: false, err:err });
    }
}

const destroy = async (req, res) => {
    const symptomId = req.params.id;
    try {
        const {success, data } = await SymptomService.destroySymptom(symptomId);
        return res.json({success,data});     
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