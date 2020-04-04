const Router = require("express").Router();
const DoctorScheduleController = require('./../../controllers').DoctorScheduleController;

/**
* @swagger
* /api/v1/user/:userId/doctor:
*   post:
*     tags:
*       - Doctors
*     name: Create Doctor
*     summary: Create a new doctor. User with userType = 2 must exist in order for patient to get created.
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties: 
*             fee:
*               type: string
*             hospital:
*               type: string
*             qualification:
*               type: string
*             specialization:
*               type: string
*             location:
*               type:string
*         required:
*           - fee
*           - hospital
*     responses:
*       201:
*         description: Doctor Created Successfully.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: true
*             data:
*               type: object
*               properties:
*                   id:
*                     type: number
*                     default: 1
*                   userId:
*                     type: number
*                     default: 1
*                   phoneNo:
*                     type: string
*                     default: 03318158386
*                   location:
*                     type: string
*                   isDiabetic:
*                     type: boolean
*                   isObese:
*                     type: boolean
*                   isSmoker:
*                     type: boolean
*                   isHypertension:
*                     type: boolean
*                   createdAt:
*                     type: string
*                     format: date
*                   updatedAt:
*                     type: string
*                     format: date
*       404:
*         description: Doctor with the given id already exists.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: false
*             message:
*               type: string
*               default: Doctor with the given User Id Already Exists.
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
Router.get("/", DoctorScheduleController.list);
Router.get("/:id", DoctorScheduleController.retrieve);
Router.post("/", DoctorScheduleController.create);
Router.put("/:id", DoctorScheduleController.update);
Router.delete("/:id", DoctorScheduleController.destroy);



module.exports = Router