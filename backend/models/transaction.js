// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Position = require('./position-1').schema
var User = require('./users-1').schema
var ObjectId = Schema.ObjectId;

// create a schema
var transactionSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        unique: false
    },
    posId: {
        type: ObjectId,
        required: true,
        unique: false
    },
    ticker: {
        type: String,
        required: true,
        unique: false
    },
    isBuy: {
        type: Boolean,
        required: true,
        unique: false
    },
    value: {
        type: Number,
        required: true,
        unique: false
    },
    qty: {
        type: Number,
        required: false,
        unique: false
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Transactions = mongoose.model('Transaction', transactionSchema);

// make this available to our Node applications
module.exports = Transactions;