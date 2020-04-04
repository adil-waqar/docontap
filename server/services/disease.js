const DiseaseModel = require('./../models').Disease;

const createDisease = async (disease) => {
    try {
        const newDisease = await DiseaseModel.create({
            ...disease
        });
        return {success: true, data: newDisease};
    }   
    catch (err) {
        return {success: false, data: err};
    }
}

const listDiseases = async () => {   
    try {
        const diseases = await DiseaseModel.findAll();
        return { statusCode: 200, success:true, data: diseases };
    }
    catch(err) {
        return { statusCode: 500, success: false, data: err };
    }
}

const getDiseaseById = async (diseaseId) => {
    try {
        const disease = await DiseaseModel.findByPk(diseaseId);
        if(disease) {
            return {success:true, data: disease};
        }
        else {
            return {success:true, message: "Not FOund"}
        }
    }
    catch(err) {
        return { success: false, data: err};
    }
}

const updateDisease = async (diseaseId,diseaseUpdate) => {
    try {
        const disease = await DiseaseModel.findByPk(diseaseId);
        if(disease) {
            try {
                const updatedDisease = await disease.update( diseaseUpdate,{fields: Object.keys(diseaseUpdate) });
                return { success: true, data: updatedDisease };
            }
            catch (err) {
                return { success: false, data: err};   
            }
        }
        else {
            return { success: true, data: "Disease Not Found"};
        }
    }
    catch (err) {
        return { success: false, data: err};
    }
}

const destroyDisease = async (diseaseId) => {
    try {
      const disease = await DiseaseModel.findByPk(diseaseId);
      if(disease) {
        await disease.destroy();
        return {success :true, data: "Resource Deleted"};
      }
      else {
          return {success: false, data: "Disease Not Found"};
      }
    } 
    catch (err) {
      return { success: false, data: err };
    }
}

const getDiseaseByName = async (diseaseName) => {
    try {
        const disease = await DiseaseModel.findOne({
            where: {name: diseaseName}
        });
        if(disease) {
            return {statusCode: 200, success:true, data: disease};
        }
        else {
            return {statusCode: 404, success:false, data: "Disease Not Found."}
        }
    }
    catch(err) {
        return { statusCode: 500, success: false, data: err};
    }
}

module.exports = {
    createDisease,
    listDiseases,
    getDiseaseById,
    updateDisease,
    destroyDisease,
    getDiseaseByName
}