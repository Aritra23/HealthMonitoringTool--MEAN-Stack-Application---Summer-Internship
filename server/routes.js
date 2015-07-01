/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

    //Rest services for Mongo
    app.use('/mongoapi', require('./api/mongoapi'));

    //testing server call
    app.use('/api/things', require('./api/thing'));

  // All other routes should redirect to the index.html
  app.route('/')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
