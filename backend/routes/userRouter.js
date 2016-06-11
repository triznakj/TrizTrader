var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users-1');
var Positions = require('../models/position-1')

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get(function (req, res, next) {
    Users.find({}, function (err, user) {
        if (err) throw err;
        console.log(user);
        res.json(user);
    });
})

.post(function (req, res, next) {
    console.log(req.body);
    Users.create(req.body, function (err, user) {
        if (err) throw err;

        var id = user._id;

        var newPos = [];
        var position = {"userId":id,"name":"Cash","value":user.cash_invested};
        Positions.create(position, function (err, pos) {
            if (err) throw err;
        })
        newPos.push(position);
        var updateObj = {"positions": newPos};
        console.log("Got here");
        Users.findByIdAndUpdate(id, updateObj, function(err, user) {
            if (err) console.error("ERROR: ",err);
        })

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the User with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Users.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

userRouter.route('/:userId')
.get(function (req, res, next) {
    Users.findById(req.params.userId, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.put(function (req, res, next) {
    console.log(req.params.userId);
    Users.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, {
        new: true
    }, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
})

.delete(function (req, res, next) {
    console.log("Got here");
    Users.findByIdAndRemove(req.params.userId, function (err, resp) {    
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = userRouter;