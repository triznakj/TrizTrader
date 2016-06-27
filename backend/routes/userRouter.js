var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users-1');
var Positions = require('../models/position-1')
var Transactions = require('../models/transaction')

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

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the User with id: ' + user._id);
    });
})

.delete(function (req, res, next) {
    Users.remove({}, function (err, resp) {
        if (err) throw err;
        Positions.remove({}, function (err, respo) {
            if (err) throw err;
            Transactions.remove({}, function (err, r) {
                if (err) throw err;
                res.json(r);
            })
        })
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
    Positions.remove({userId: req.params.userId}, function (err) {
        if (err) throw err;
        Users.findByIdAndRemove(req.params.userId, function (err, resp) {    
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = userRouter;