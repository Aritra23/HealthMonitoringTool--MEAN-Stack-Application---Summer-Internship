/**
 * Main application file
 */

'use strict';

// Set default node environment to development
//process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var fs = require("fs");

var express = require('express');
var config = require('./config/environment');

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);


// Start https server
server.listen(9000, config.ip, function () {
  console.log('Express server listening on 9000, in %s mode', app.get('env'));
});

// Expose app
var exports = module.exports = app;
