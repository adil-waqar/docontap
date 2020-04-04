const SymptomModel = require('./../models').Symptom;
const statusCodes = require("./../constants/statusCodes");

const createSymptom = async (symptom) => {
    try {
        const newSymptom = await SymptomModel.create({
            ...symptom
        });
        return {statusCode: statusCodes.CREATED, success: true, data: newSymptom};
    }   
    catch (err) {
        return {statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const listSymptoms = async () => {   
    try{
        const symptoms = await SymptomModel.findAll();
        return { statusCode: statusCodes.OK, success:true, data: symptoms };
    }
    catch(err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
    }
}


const getSymptomById = async (symptomId) => {
    try {
        const symptom = await SymptomModel.findByPk(symptomId);
        if(symptom) {
            return { statusCode: statusCodes.OK, success:true, data: symptom};
        }
        else {
            return { statusCode: statusCodes.NOT_FOUND, success:true, message: "Not Found"}
        }
    }
    catch(err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}

const updateSymptom = async (symptomId,symptomUpdate) => {
    try {
        const symptom = await SymptomModel.findByPk(symptomId);
        if(symptom) {
            try {
                const updatedSymptom = await symptom.update( symptomUpdate,{fields: Object.keys(symptomUpdate) });
                return { statusCode: statusCodes.OK, success: true, data: updatedSymptom };
            }
            catch (err) {
                return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};   
            }
          
        }
        else {
            return { statusCode: statusCodes.NOT_FOUND, success: true, data: "Symptom Not Found"};
        }
    }
    catch (err) {
        return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err};
    }
}


const destroySymptom = async (symptomId) => {
    try {
      const symptom = await SymptomModel.findByPk(symptomId);
      if(symptom) {
        await symptom.destroy();
        return {statusCode: statusCodes.NO_CONTENT,  success :true, data: "Resource Deleted"};
      }
      else {
          return { statusCode: statusCodes.NOT_FOUND, success: false, data: "Symptom Not Found" };
      }
    } 
    catch (err) {
      return { statusCode: statusCodes.BAD_REQUEST, success: false, data: err };
    }
}


const addAssessment = (symptoms, assessmentId) => {
    let newSymptoms = [];
    for(let i=0;i<symptoms.length;++i) {
        symptom = { ...symptoms[i], assessmentId: assessmentId};
        newSymptoms.push(symptom);
    }
    return newSymptoms;
}
   
const createSymptomsOfAssesment =  async (assessmentId, symptoms) => {
    try {
        let updatedSymptom = addAssessment(symptoms,assessmentId);     
        try {
            await SymptomModel.bulkCreate(updatedSymptom, {returning: true});
            return { updatedSymptom };
        }
        catch(err) {
            return { err };
        }
    }
    catch (err) {
        return { err };
    }
}

module.exports = {
    createSymptom,
    listSymptoms,
    getSymptomById,
    updateSymptom,
    destroySymptom,
    createSymptomsOfAssesment
}