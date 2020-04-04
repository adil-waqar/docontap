const User = require("./user");
const DoctorController = require('./doctor');
const PatientController = require('./patient');
const AppointmentController = require('./appointment');
const AssessmentController = require('./assessment');
const DiseaseController = require("./disease");
const DoctorScheduleController = require("./doctorSchedule");
const ReviewController = require("./review");
const SymptomController = require('./symptom');
const ConditionController = require("./condition");

module.exports = {
    User,
    DoctorController,
    PatientController,
    AppointmentController,
    DiseaseController,
    DoctorScheduleController,
    ReviewController,
    SymptomController,
    AssessmentController,
    ConditionController
}