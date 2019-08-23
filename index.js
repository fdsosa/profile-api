var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var express = require('express');
var cors = require('cors');
var server = express();
var path = require('path');
var port = process.env.PORT || 3000;

var env = process.env.ENV || 'DEV';
var folderBuild = env == 'PROD' ? '/dist/' : '/.temp/';

var mongoUrl = 'mongodb://localhost:27017/';
var dbname = 'proyect-cv';

server.use(express.static(path.join(__dirname, folderBuild)));
server.use(cors());

function getCollection(collectionName) {
    return mongoClient
        .connect(mongoUrl)
        .then(function (client) {
            return client.db(dbname);
        })
        .then(function (database) {
            return database.collection(collectionName);
        })
}

server.get('/api/datos-personales', function (req, res) {
    getCollection('personal-data')
        .then(function (collection) {
            return collection.find({}).toArray();
        })
        .then(function (results) {
            return res.status(200).send(results[0] || {});
        })
        .catch(function (error) {
            return res.status(500).send(error);
        });
});
  
server.get('/api/social-networks', function (req, res) {
    getCollection('social-networks')
        .then(function (collection) {
            return collection.find({}).toArray();
        })
        .then(function (results) {
            return res.status(200).send(results);
        })
        .catch(function (error) {
            return res.status(500).send(error);
        });
});
  
server.get('/api/description', function (req, res) {
    getCollection('description')
        .then(function (collection) {
            return collection.find({}).toArray();
        })
        .then(function (results) {
            return res.status(200).send(results[0] || {});
        })
        .catch(function (error) {
            return res.status(500).send(error);
        });
});
  
server.get('/api/skills', function (req, res) {
    getCollection('skills')
        .then(function (collection) {
            return collection.find({}).toArray();
        })
        .then(function (results) {
            return res.status(200).send(results);
        })
        .catch(function (error) {
            return res.status(500).send(error);
        });
});
  
server.get('/api/skill', function (req, res) {
    getCollection('skills')
        .then(function (collection) {
            return collection.find({name:"CSS"}).toArray();
        })
        .then(function (results) {
            return res.status(200).send(results);
        })
        .catch(function (error) {
            return res.status(500).send(error);
        });
});

server.listen(port, function () {
    console.log('Mi servidor esta en linea en el puerto ' + port);
});