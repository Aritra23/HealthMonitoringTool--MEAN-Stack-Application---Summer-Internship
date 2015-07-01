'use strict';

var express = require('express');
//var controller = require('./mongo.controller');

var router = express.Router();

router.get('/getallDis', function(req, res) {
    var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

// Connection URL
    var url = 'mongodb://dselaman:root@ds041032.mongolab.com:41032/honeybee';
// Use connect method to connect to the Server
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
          findDocuments(db, function(docs) {
             res.json(docs);
             db.close();
        });
    });

    var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('disease-keymetrics');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            callback(docs);
        });
    }
});

module.exports = router;
