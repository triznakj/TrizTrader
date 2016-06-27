var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users-1');
var Positions = require('../models/position-1')
var Transactions = require('../models/transaction')

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
            user.positions.push(pos);
            user.cash_held -= pos.value;

            user.save();
            res.json(user);
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
    Positions.findByIdAndUpdate(req.params.posId, {
        $set: req.body
    }, {
        new: true
    }, function (err, pos) {
        if (err) throw err;
        Users.findById(pos.userId, function(err, user) {
            if (err) throw err;
            for(i = 0; i < user.positions.length; i++){
                var p = user.positions[i];

                if(p.name == pos.name){
                    p.value = pos.value;
                }

            }
            user.save();
        })
        res.json(pos);
    });
})

.delete(function (req, res, next) {
    Positions.findById(req.params.posId, function (err, pos) {
        if (err) throw err;

        Users.findById(pos.userId, function (err, user) {
            if (err) throw err;
            user.cash_held += pos.value;

            var spliceIndex = -1;

            for(i = 0; i < user.positions.length; i++){
                if(user.positions[i] == req.params.posId){
                    spliceIndex = i;
                }
            }

            user.positions.splice(spliceIndex,1);
            user.save();

            Positions.findByIdAndRemove(req.params.posId, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });

        });
        
    });

});

module.exports = positionRouter;