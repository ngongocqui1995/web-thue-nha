const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// create express app
var app = express();
var cors = require('cors');

module.exports = app; // for testing

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

require('./app/routes/nha.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/chinhanh.routes')(app);
require('./app/routes/chunha.routes')(app);
require('./app/routes/nguoithue.routes')(app);
require('./app/routes/thuenha.routes')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to api chat box"});
});

app.listen(process.env.PORT || 4098, () => {
    console.log("Server is listening on port 4098");
});