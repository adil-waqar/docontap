const Router = require("express").Router();
const ConditionController = require('./../../controllers').ConditionController;

Router.get("/", ConditionController.list);
Router.get("/:id", ConditionController.retrieve);
Router.post("/", ConditionController.create);
Router.put("/:id", ConditionController.update);
Router.delete("/:id", ConditionController.destroy);
Router.get("/", ConditionController.list);

module.exports = Router