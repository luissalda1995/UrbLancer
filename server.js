var express = require('express');
var mongoose = require('mongoose'); // "mongoose": "~3.6.13",
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();
app.use(bodyParser.json());
// To parse bodies as JSON objects
app.use(bodyParser.urlencoded({ extended: true })); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// To render the views, for now just using the HTML engine

mongoose.connect('mongodb://localhost:27017/urblancer', function (error) {
// Create the connection to the MongoDB 'urblancer' database with Mongoose
    if (error) {
        console.log(error);
    }
});

var Schema = mongoose.Schema;
var RequestSchema = new Schema({
// Schema for the storing of user requests.
    username: String,
    description: String,
    tag: Array,
    posx: Number,
    posy: Number
});

var OfferSchema = new Schema({
// Schema for the storing of provider offerings.
    username: String,
    description: String,
    tag: Array,
    posx: Number,
    posy: Number
});

var Request = mongoose.model('requests', RequestSchema);
var Offer   = mongoose.model('offers', OfferSchema);

app.post('/request', function (req, res) {
// To handle the submission of user requests
    var request = new Request(req.body);
    request.save(function (err) {
        if (err) {
            return res.send(err);
        }
        var response = {};
        response["results"] = [];
        Offer.find({}, function (err, offers) {
            response["results"] = offers;
            res.send(response);
        });
    });
});

app.post('/offer', function (req, res) {
// To handle the submission of provider offerings
    var offer = new Offer(req.body);
    offer.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({ message: 'Request Added' });
    })
});

app.get('/', function(req, res) {
// This is so we can render the index.html file containing the 'single-page' app.
    res.render('index', { title: 'ejs' });
});

app.get("/scripts/script.js", function(req, res) {
// This is so we can render the static file containing the javascript code.
// There must be better ways to do this.
    var script = fs.readFileSync("scripts/script.js", "utf8");
    res.setHeader('content-type', 'text/javascript');
    res.end(script);
});

app.get('/testOffer', function (req, res) {
// This creates a random test offer for a user to match to test functionality.
    var offer = new Offer({
        "username" : "user" + (Math.random() * 100000),
        "description" : "this is a test request",
        "tag" : ["cerrajeria", "plomeria", "mensajeria"],
        "poslat" : Math.random() * 180 * (Math.round(Math.random()) == 0? 1 : -1),
        "poslong" : Math.random() * 180 * (Math.round(Math.random()) == 0? 1 : -1)
    })
    offer.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({ message: 'Request Added' });
    });
});

app.post('/login', function (req, res) {
// For now we don't have a login, we'll just manage with handling its route.
    res.send({ "data" : "success" });
});

var port = process.env.port || 3000;
// In case there isn't a set port, lets use the default port 3000.
app.listen(3000);
console.log("Server listening on port " + port);
