module.exports = (app) => {
    app.use("/api/v1/user", require('./user'));
    app.use("/api/v1/patient", require('./patient'));
    app.use("/api/v1/doctor", require('./doctor'));
    app.use("/api/v1/appointment", require('./appointment'));
    app.use("/api/v1/review", require('./review'));
    app.use("/api/v1/doctor-schedule", require('./doctorSchedule'));
    app.use("/api/v1/disease", require('./disease'));
    app.use("/api/v1/symptom", require('./symptom'));
    app.use("/api/v1/assessment", require('./assessment'));
    app.use("/api/v1/condition", require('./condition'));
}