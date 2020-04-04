const UserService = require('./user');
const DoctorService = require('./doctor');
const PatientService = require('./patient');
const AppointmentService = require('./appointment');
const AssessmentService = require('./assessment');
const DoctorScheduleService = require("./doctorSchedule");
const ReviewService = require("./review");
const DiseaseService = require("./disease");
const SymptomService = require("./symptom");
const ConditionService = require("./condition");

module.exports = {
    UserService,
    DoctorService,
    PatientService,
    AppointmentService,
    AssessmentService,
    DoctorScheduleService,
    ReviewService,
    DiseaseService,
    SymptomService,
    AssessmentService,
    ConditionService
}