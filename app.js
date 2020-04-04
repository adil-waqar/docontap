const express = require("express");
const app = express();
const Cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-auth-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Doc On Tap Api",
            description: "Doc On Tap API",
            contact: {
                name: "Sadiq Shah Yushi Bazukay"
            },
            servers: ["https://localhost:5000"]
        }
    },
    //
    apis: ["./server/api/routes/*.js"]
}
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

const corsOptions = {
    exposedHeaders: 'x-auth-token',
};

app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerSpec));
app.use(Cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
require('./server/api/routes')(app);

module.exports = app;