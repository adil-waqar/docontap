const Router = require("express").Router();
const AppointmentController = require('./../../controllers').AppointmentController;

Router.get("/", AppointmentController.list);
Router.get("/:id", AppointmentController.retrieve);

Router.post("/", AppointmentController.create);

/**
* @swagger
* /api/v1/appointment/:appointmentId:
*   put:
*     tags:
*       - Appointment
*     name: Update Appointment. Accept/decline Status update
*     summary: Update Apppointment Status. Pass updated attributes in requeset body.
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Appointment Updated successfully. Make A request to see it properly.
*       404:
*         description: Appointment Not Found.
*       500:
*         description: Bad Request, Success in response will be false
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: false
*             err:
*               type: object
*/
Router.put("/:id", AppointmentController.update);
Router.delete("/:id", AppointmentController.destroy);



module.exports = Router