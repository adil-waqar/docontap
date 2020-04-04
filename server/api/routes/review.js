const Router = require("express").Router();
const ReviewController = require('./../../controllers').ReviewController;

Router.get("/", ReviewController.list);
Router.get("/:id", ReviewController.retrieve);
Router.post("/", ReviewController.create);
Router.put("/:id", ReviewController.update);
Router.delete("/:id", ReviewController.destroy);
Router.get("/", ReviewController.list);



module.exports = Router