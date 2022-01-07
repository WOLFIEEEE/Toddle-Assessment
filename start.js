
//libaries required
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");


var dir = path.join(__dirname, 'img');
const app = express();


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    // website which can only access this backend server
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");

    // Request methods which are allowed to this backend server
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    // Request headers which are allowed to this backend server
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    res.header("Access-Control-Expose-Headers", "*");

    // Pass to next layer
    next();
};


// Middleware
// for converting the json part of the request body
app.use(express.json());
app.use(bodyParser.json());

// for allowing requests from the frontend or other domains
app.use(allowCrossDomain);
app.use(express.static(dir));

app.use("/api", require("./routes/login/auth")); // public api route that handles the login part

app.use("/api/survey", require("./routes/survey/survey")); // api routes for handling survey

app.use("/api/imgrs", require("./routes/image/image")); //api request for changing the image resolution

app.get('/', (req, res) => {
    const msg = "Welcome to toddle Backend Assessment "
    res.status(200)
        .send(msg);

})
app.get('*', function(req, res) {
    res.status(404).end('Not found');
});


const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}!!`);
});
module.exports = { server: server };