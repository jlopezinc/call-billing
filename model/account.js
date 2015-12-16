'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountDefinition = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    customMargin: {
        type: Number
    }
};

// account schema
var AccountSchema = new Schema(AccountDefinition);

exports.model = mongoose.model('Account', AccountSchema);

