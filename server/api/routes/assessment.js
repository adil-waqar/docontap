const Router = require("express").Router();
const AssessmentController = require('./../../controllers').AssessmentController;


Router.get("/", AssessmentController.list);
Router.get("/:id", AssessmentController.retrieve);
Router.put("/:id", AssessmentController.update);
Router.delete("/:id", AssessmentController.destroy);




module.exports = Router