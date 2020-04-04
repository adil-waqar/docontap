const Router = require("express").Router();
const UserController = require('./../../controllers/user');
const PatientController = require('./../../controllers/patient');
const { checkIfUserIsPatient, ifPatientExist } = require("./../middlewares/patient");
const DoctorController = require('./../../controllers').DoctorController;
const { checkIfUserIsDoctor, ifDoctorExist } = require("./../middlewares/doctor");

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      name:
 *        type: string
 *      email:
 *        type: string
 *        format: email
 *        description: Email of the user is unique.
 *      password:
 *        type: string
 *        format: password
 *      dob:
 *        type: string
 *        format: date
 *      userType:
 *          type: number
 *          description: value 1 for patient and 2 for doctor.
 *      createdAt:
 *        type: string
 *        format: date
 *      updatedAt:
 *        type: string
 *        format: date
 *      required:
 *        - name
 *        - email
 *        - password
 *        - dob
 *        - userType
 */


/**
* @swagger
* /api/v1/user/signup:
*   post:
*     tags:
*       - User
*     name: Create User
*     summary: Create a new user. For patient, userType = 1 and for Doctor, userType = 2
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
*             name:
*               type: string
*             email:
*               type: string
*               format: email
*             password:
*               type: string
*               format: password
*             dob:
*               type: string
*               format: date
*             userType:
*               type: number
*         required:
*           - name
*           - email
*           - password
*           - dob
*           - userType
*     responses:
*       201:
*         description: User Created Successfully.
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
*                   name:
*                     type: string
*                   email:
*                     type: string
*                     format: email
*                   password:
*                     type: string
*                     format: password
*                   dob:
*                     type: string
*                     format: date
*                   userType:
*                     type: number
*                   createdAt:
*                     type: string
*                     format: date
*                   updatedAt:
*                     type: string
*                     format: date
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

Router.post("/signup", UserController.create);
/**
* @swagger
* /api/v1/user/auth:
*   get:
*     tags:
*       - User
*     name: Auth and get user
*     summary: Pass Auth token in request header and get User All Details.
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get User From Auth
*       403:
*         description: Invalid Token.
*       500:
*         description: Bad Request.
*/
Router.get("/auth", UserController.getUserFromAuth);

Router.get("/", UserController.list);

/**
* @swagger
* /api/v1/user/:userId/patient:
*   post:
*     tags:
*       - Patients
*     name: Create Patient
*     summary: Create a new patient. User with userType = 1 must exist in order for patient to get created.
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
*             location:
*               type: string
*             phoneNo:
*               type: string
*             isDiabetic:
*               type: boolean
*               default: false
*             isSmoker:
*               type: boolean
*               default: false
*             isHypertension:
*               type: boolean
*               default: false
*             isObese:
*               type: boolean
*               default: false
*         required:
*           - location
*           - phoneNo
*     responses:
*       201:
*         description: Patient Created Successfully.
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
*         description: Patient with the given id already exists.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: false
*             message:
*               type: string
*               default: Patient with the given User Id Already Exists.
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
Router.post("/:userId/patient", checkIfUserIsPatient, ifPatientExist, PatientController.create);

/**
* @swagger
* /api/v1/user/login:
*   post:
*     tags:
*       - User
*     name: Login User
*     summary: Login with email and password. Returns patient data if patient and doctor data if doctor. Make a request to have a better understanding.
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
*             email:
*               type: string
*               format: email
*             password:
*               type: string
*     responses:
*       201:
*         description: Patient Created Successfully.
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
*                   userType:
*                     type: number
*                     default: 1
*                   email:
*                     type: string
*                     format: email
*                   password:
*                     type: string
*                   dob:
*                     type: string
*                     format: date
*                   created_at:
*                     type: string
*                     format: date
*                   updated_at:
*                     type: string
*                     format: date
*       404:
*         description: Patient with the given id already exists.
*         schema:
*           type: object
*           properties: 
*             success:
*               type: boolean
*               default: false
*             message:
*               type: string
*               default: Patient with the given User Id Already Exists.
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
Router.post("/login", UserController.login);

Router.get("/:id", UserController.retrieve);

Router.put("/:id", UserController.update);
Router.delete("/:id", UserController.destroy);
Router.get("/", UserController.list);


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
Router.post("/:userId/doctor", checkIfUserIsDoctor, ifDoctorExist, DoctorController.create);



module.exports = Router