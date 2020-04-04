const Router = require("express").Router();
const DiseaseController = require('./../../controllers').DiseaseController;

Router.post("/name", DiseaseController.getByName);
Router.get("/", DiseaseController.list);
Router.get("/:id", DiseaseController.retrieve);
Router.post("/", DiseaseController.create);
Router.put("/:id", DiseaseController.update);
Router.delete("/:id", DiseaseController.destroy);
Router.get("/", DiseaseController.list);



module.exports = Router