const Router = require("express").Router();
const PatientController = require('./../../controllers/').PatientController;
const AssessmentController = require('./../../controllers').AssessmentController;
const { ifPatientDoesExist } = require("./../middlewares/patient");
const { ifDoctorExist } = require("./../middlewares/doctor");

const AppointmentController = require("./../../controllers").AppointmentController;
const { auth } = require('./../middlewares/auth');

Router.get("/", auth ,PatientController.list);

/**
* @swagger
* /api/v1/patient/:patientId:
*   get:
*     tags:
*       - Patients
*     name: Get Patient Data
*     summary: Returns Patient Data.
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Returned Patient Data successfully.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: true
*             data:
*               type: object
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
Router.get("/:id", PatientController.retrieve);
Router.put("/:id", PatientController.update);
Router.delete("/:id", PatientController.destroy);



/**
* @swagger
* /api/v1/patient/:patientId/assessment:
*   get:
*     tags:
*       - Assessment
*     name: List Patient Assessment
*     summary: List All Assessments of a patient.
*     produces:
*       - application/json
*     responses:
*       200:
*         description: All assessments are listed successfully.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: true
*             data:
*               type: array
*               items:
*                   type: object
*                   properties:
*                       id:
*                           type:number
*                       patientId:
*                           type:number
*                       conditions:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   id:
*                                       type: number
*                                   assessmentId:
*                                       type:number
*                                   name:
*                                       type: string
*                                   probability:
*                                       type: number
*                                   createdAt:
*                                       type: string
*                                       format: date
*                                   updatedAt:
*                                       type: string
*                                       format: date
*                       symptoms:
*                           type: array
*                           items:
*                               type: object
*                               properties:
*                                   id:
*                                       type: number
*                                   assessmentId:
*                                       type: number
*                                   name:
*                                       type: string
*                                   reported:
*                                       type: boolean
*                                   createdAt:
*                                       type: string
*                                       format: date
*                                   updatedAt:
*                                       type: string
*                                       format: date                               
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
Router.get("/:id/assessment", PatientController.assessmentlist);

/**
* @swagger
* /api/v1/patient/:patientId/assessment:
*   post:
*     tags:
*       - Assessment
*     name: Create Assessment
*     summary: Create a new Assessment. You have to pass symptoms and conditions array.
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*               type: object
*               properties: 
*                   conditions:
*                       type: array
*                       items:
*                           type: object
*                           properties:
*                               name:
*                                   type: string
*                               probability:
*                                   type: number
*                                   format: float                   
*                   symptoms:
*                       type: array
*                       items:
*                           type: object
*                           properties:
*                              name:
*                                   type: string                   
*                              reported:
*                                   type: boolean
*                                   default: true
*         required:
*           - conditions
*           - symptoms
*     responses:
*       201:
*         description: Assessment Created Successfully. Make A request to see it properly.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: true
*             data:
*               type: object
*               properties:
*                   assesment:
*                       type: object
*                       properties:
*                       id:
*                          type:number
*                   conditions:
*                       type: array
*                       items:
*                            type: object
*                            properties:
*                               name:
*                                   type: string
*                               probability:
*                                   type: number
*                                   default: 0.24
*                   symptoms:
*                       type: array
*                       items:
*                            type: object
*                            properties:
*                               name:
*                                   type: string                                
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
Router.post("/:patientId/assessment", ifPatientDoesExist, ifDoctorExist, AssessmentController.create);

/**
* @swagger
* /api/v1/patient/:patientId/appointment:
*   get:
*     tags:
*       - Appointment
*     name: List Appointments Of Patient
*     summary: Return all appointments of patients
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Appointments Of Patient returned successfully. Make A request to see it properly.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: true
*             data:
*               type: object
*               item: 
*                   type: object
*                   properties:
*                       id:
*                           type: number
*                       status:
*                           type: string
*                       doctor:
*                           type: object
*                           properties:
*                               id:
*                                   type: number
*                               userId:
*                                   type: number
*                               fee:
*                                   type: number
*                               hospital:
*                                   type: string
*                               qualification:
*                                   type: string
*                               specialization:
*                                   type: string
*                               rating:
*                                   type: number
*                               user:
*                                   type: object
*                                   properties:
*                                       id:
*                                           type: number
*                                       name:
*                                           type: string
*                                       userType:
*                                           type: number
*                                       email:
*                                           type: string
*                                           format: email
*                                       password:
*                                           type: string
*                                       dob:
*                                           type: string
*                                           format: date 
*                                       createdAt:
*                                           type: string
*                                           format: date
*                                       updatedAt:
*                                           type: string
*                                           format: date
*                       assessment:
*                           type: object
*                           properties:
*                               id:
*                                   type: number
*                               conditions:
*                                   type: array
*                               symptoms:
*                                   type: array     
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
Router.get("/:patientId/appointment", AppointmentController.listPatientAppointments);

/**
* @swagger
* /api/v1/patient/:patientId/appointment:
*   post:
*     tags:
*       - Appointment
*     name: Create Appointment
*     summary: Create Appointment
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
*             doctorId:
*               type: number
*             time:
*               type: string
*               format: date
*             status:
*               type: string
*             assessmentId:
*               type: string
*     responses:
*       200:
*         description: Appointment Of Patient created successfully. Make A request to see it properly.
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
*                       type: number
*                   doctorId:
*                       type: number
*                   time:
*                       type: string
*                       format: date
*                   status:
*                       type: string
*                   assessmentId:
*                       type: number
*                   patientId:
*                       type: number
*                   updatedAt:
*                       type: string
*                       format: date
*                   createdAt:
*                       type: string
*                       format: date
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
Router.post("/:patientId/appointment", AppointmentController.create);

module.exports = Router