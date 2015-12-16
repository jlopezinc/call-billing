'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var callDefinition = {
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    duration: Number,
    talkdeskPhoneNumber: {
        type: String,
        required: true
    },
    customerPhoneNumber: {
        type: String,
        required: true
    },
    forwardPhoneNumber: String,
    cost: {
        type: Number,
        required: true
    }
};

// Call schema
var CallSchema = new Schema(callDefinition);

// Call model
exports.model = mongoose.model('Call', CallSchema);



