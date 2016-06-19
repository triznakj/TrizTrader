// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Position = require('./position-1').schema
var ObjectId = Schema.ObjectId;

// create a schema
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    goals: {
        type: String,
        required: true
    },
    cash_invested: {
        type: Number,
        required: true
    },
    cash_held: {
        type: Number,
        required: true
    },
    positions: [ObjectId]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Users = mongoose.model('User', userSchema);

// make this available to our Node applications
module.exports = Users;