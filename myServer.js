'use strict';
var express = require("express");
var app = express();
var routes = require("./routes.js");
var port = 8080;

routes(app);

app.listen(port, function() {
    console.log('listening on port 8080')
})