'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var countryInfoDefinition = {
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    prefixes: [String]
};

// Call schema
var CountryInfoSchema = new Schema(countryInfoDefinition);

// Call model
exports.model = mongoose.model('CountryInfo', CountryInfoSchema);



