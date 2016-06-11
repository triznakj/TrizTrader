var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users-1');
var Positions = require('../models/position-1')

var positionRouter = express.Router();
positionRouter.use(bodyParser.json());

positionRouter.route('/')
.get(function (req, res, next) {
    Positions.find({}, function (err, pos) {
        if (err) throw err;
        console.log(pos);
        res.json(pos);
    });
})

.post(function (req, res, next) {
    Positions.create(req.body, function(err, pos) {
        if (err) console.error("ERROR: ", err);
        var userId = pos.userId;
        Users.findById(userId, function (err, user) {
            if(err) console.error("ERROR: ", err);
            var newPos = user.positions;
            newPos.push(pos);

            for(i = 0; i < newPos.length; i++){
                var p = newPos[i];
                if(p.name == "Cash"){
                    p.value = p.value - pos.value;
                }
            }
            var updateObj = {"positions":newPos};
            Users.findByIdAndUpdate(userId, updateObj, function(err, user) {
                if(err) console.error("ERROR: ", err);
                res.json(user);
            });
        });
    });
})

.delete(function (req, res, next) {
    Positions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

positionRouter.route('/:posId')
.get(function (req, res, next) {
    Positions.findById(req.params.posId, function (err, pos) {
        if (err) throw err;
        res.json(pos);
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
    console.log("DELETE REQUEST");
    console.log(req.params.posId);
    Positions.findByIdAndRemove(req.params.posId, function (err, resp) {       
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = positionRouter;