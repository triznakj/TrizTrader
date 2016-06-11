// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId

// create a schema
var positionSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        unique: false
    },
    name: {
        type: String,
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
var Positions = mongoose.model('Position', positionSchema);

// make this available to our Node applications
module.exports = Positions;