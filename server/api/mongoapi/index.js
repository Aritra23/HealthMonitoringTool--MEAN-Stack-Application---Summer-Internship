'use strict';

var express = require('express');
//var controller = require('./mongo.controller');

var router = express.Router();
// Connection URL
var url = 'mongodb://dselaman:root@ds041032.mongolab.com:41032/honeybee';

router.get('/getAllDev', function(req, res) {
    var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

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
        var collection = db.collection('devicedb');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
            callback(docs);
        });
    }
});

router.get('/getAllFeatures', function(req, res) {
    var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

// Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('devicedb');
        collection.findOne({},function(err, docs) {
            var features = [];
            for(var val in docs){
                if(val == "_id")
                    continue;
                features.push(val);
            }
            res.send(features);
            db.close();
        });
    });
});

router.get('/getAllDiseases', function(req, res) {
    var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

// Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('disease-keymetrics');
        collection.find({}).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

module.exports = router;
