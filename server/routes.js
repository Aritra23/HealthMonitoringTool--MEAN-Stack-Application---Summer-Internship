/**
 * Created by dselaman on 6/30/15.
 */
'use strict';

//var errors = require('./components/errors');

module.exports = function(app) {

    // Insert routes below
    //app.use('/api/things', require('./api/thing'));


    // All other routes should redirect to the index.html
    /*app.route('/')
        .get(function(req, res) {
            console.log(app.get('appPath'));
            res.send("Hello");
            //res.sendfile(app.get('appPath') + '/index.html');
        });*/
    app.all('/',function(req, res) {
        res.send("Hello");
        //res.sendfile('/index.html');
    });
};
