var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users-1');
var Positions = require('../models/position-1')
var Transactions = require('../models/transaction')

var transactionRouter = express.Router();
transactionRouter.use(bodyParser.json());

transactionRouter.route('/')
.get(function (req, res, next) {
    Transactions.find({}, function (err, tran) {
        if (err) throw err;
        console.log(tran);
        res.json(tran);
    });
})

.post(function (req, res, next) {
    console.log("HERE BITCH");
    console.log(req.body);
    Transactions.create(req.body, function (err, tran) {
        if (err) throw err;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Transaction with id: ' + tran._id);
    });
});


module.exports = transactionRouter;