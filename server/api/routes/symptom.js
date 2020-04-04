const Router = require("express").Router();
const SymptomController = require('../../controllers').SymptomController;

Router.get("/", SymptomController.list);
Router.get("/:id", SymptomController.retrieve);
Router.post("/", SymptomController.create);
Router.put("/:id", SymptomController.update);
Router.delete("/:id", SymptomController.destroy);
Router.get("/", SymptomController.list);



module.exports = Router