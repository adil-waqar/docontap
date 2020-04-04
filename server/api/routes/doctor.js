const Router = require('express').Router();
const DoctorController = require('./../../controllers').DoctorController;
const AppointmentController = require('./../../controllers')
  .AppointmentController;
/**
 * @swagger
 * /api/v1/doctor:
 *   get:
 *     tags:
 *       - Doctors
 *     name: List All Doctors
 *     summary: Return All Dotors Data.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An Array Of All Doctors Successfully.It will also return doctorSchedule of each doctor. Make a request to see it properly.
 *         schema:
 *           type: object
 *           properties:
 *               success:
 *                   type: boolean
 *                   default: false
 *               data:
 *                   type: array
 *                   items:
 *                       type: object
 *                       properties:
 *                           id:
 *                               type: number
 *                           userId:
 *                               type: number
 *                           fee:
 *                               type: number
 *                           hospital:
 *                               type: string
 *                           qualification:
 *                               type: string
 *                           specialization:
 *                               type: string
 *                           rating:
 *                               type: number
 *                           user:
 *                               type: object
 *                               properties:
 *                                   id:
 *                                       type: number
 *                                   name:
 *                                       type: string
 *                                   email:
 *                                       type: string
 *                                       format: email
 *                                   dob:
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
Router.get('/', DoctorController.list);

/**
 * @swagger
 * /api/v1/doctor/:doctorId:
 *   get:
 *     tags:
 *       - Doctors
 *     name: Reterive data of doctor .
 *     summary: Return Data of the doctor of the given id. It will also return doctor schedule. Make A Request to see it properly.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A doctor data object returned successfully.
 *         schema:
 *           type: object
 *           properties:
 *               success:
 *                   type: boolean
 *                   default: false
 *               data:
 *                       type: object
 *                       properties:
 *                           id:
 *                               type: number
 *                           userId:
 *                               type: number
 *                           fee:
 *                               type: number
 *                           hospital:
 *                               type: string
 *                           qualification:
 *                               type: string
 *                           rating:
 *                               type: number
 *                           user:
 *                               type: object
 *                               properties:
 *                                   id:
 *                                       type: number
 *                                   name:
 *                                       type: string
 *                                   email:
 *                                       type: string
 *                                       format: email
 *                                   dob:
 *                                       type: string
 *                                       format: date
 *       404:
 *         description: Doctor with the given Id not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: false
 *             data:
 *               type: message
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
Router.get('/:id', DoctorController.retrieve);

Router.put('/:id', DoctorController.update);
Router.delete('/:id', DoctorController.destroy);

/**
 * @swagger
 * /api/v1/doctor/:doctorId/appointment:
 *   get:
 *     tags:
 *       - Appointment
 *     name: List Appointments Of Doctor
 *     summary: Return all appointments of doctors
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Appointments Of Doctor returned successfully. Make A request to see it properly.
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
 *                               location:
 *                                   type: string
 *                               phone:
 *                                   type: string
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
Router.get(
  '/:doctorId/appointment',
  AppointmentController.listDoctorAppointments
);

/**
 * @swagger
 * /api/v1/doctor/location/:location:
 *   get:
 *     tags:
 *       - Doctors
 *     name: List All Doctors Of Given Location
 *     summary: Return All Dotors Data Of Given Location
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An Array Of All Doctors Successfully.It will also return doctorSchedule of each doctor. Make a request to see it properly.
 *         schema:
 *           type: object
 *           properties:
 *               success:
 *                   type: boolean
 *                   default: false
 *               data:
 *                   type: array
 *                   items:
 *                       type: object
 *                       properties:
 *                           id:
 *                               type: number
 *                           userId:
 *                               type: number
 *                           fee:
 *                               type: number
 *                           hospital:
 *                               type: string
 *                           qualification:
 *                               type: string
 *                           specialization:
 *                               type: string
 *                           rating:
 *                               type: number
 *                           user:
 *                               type: object
 *                               properties:
 *                                   id:
 *                                       type: number
 *                                   name:
 *                                       type: string
 *                                   email:
 *                                       type: string
 *                                       format: email
 *                                   dob:
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
Router.get('/location/:location', DoctorController.getDoctorsByLocation);

// Router.post("/:doctorId/appointment/:appointmentId/status", AppointmentController.updateStatusOfAppointment);

module.exports = Router;
