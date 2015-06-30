/**
 * Created by Dilip on 6/15/2015.
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
//var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
//require('./config/express')(app);
require('./routes')(app);

/*
 // Start server
 server.listen(config.port, config.ip, function () {
 console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
 });
 */

// Start http server
server.listen(3443, "localhost", function () {
    console.log('Express server listening on 3443, in %s mode', app.get('env'));
});


// Expose app
module.exports = app;
