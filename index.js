var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var express = require('express');
var cors = require('cors');
var server = express();
var path = require('path');
var port = process.env.PORT || 3000;

var mongoUrl = MONGO_URI || 'mongodb://localhost:27017/';
var dbname = DB_NAME || 'proyect-cv';

server.use(express.static(path.join(__dirname, folderBuild)));
server.use(cors());

function getCollection(collectionName) {
    return mongoClient
        .connect(mongoUrl)
        .then(client => client.db(dbname))
        .then(database => database.collection(collectionName))
}

server.get('/api/datos-personales', function (req, res) {
    getCollection('personal-data')
        .then( collection => collection.find({}).toArray())
        .then( results    => res.status(200).send(results[0] || {}))
        .catch( error     => res.status(500).send(error))
});
  
server.get('/api/social-networks', function (req, res) {
    getCollection('social-networks')
        .then(collection => collection.find({}).toArray())
        .then(results    => res.status(200).send(results))
        .catch(error     => res.status(500).send(error))
});
  
server.get('/api/description', function (req, res) {
    getCollection('description')
        .then(collection => collection.find({}).toArray())
        .then(results    => res.status(200).send(results[0] || {}))
        .catch(error     => res.status(500).send(error))
});
  
server.get('/api/skills', function (req, res) {
    getCollection('skills')
        .then(collection => collection.find({}).toArray())
        .then(results => res.status(200).send(results))
        .catch(error => res.status(500).send(error))
});
  
server.get('/api/skill', function (req, res) {
    getCollection('skills')
        .then(collection => collection.find({name:"CSS"}).toArray())
        .then(results => res.status(200).send(results))
        .catch(error => res.status(500).send(error))
});

server.listen(port, function () {
    console.log('Mi servidor esta en linea en el puerto ' + port);
});