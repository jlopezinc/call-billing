'use strict';

var CountryInfo = require('../model/countryInfo');
var fs = require('fs');


var initializeCountryInfo = function (filePath){

};

exports.calculateCost = function (data){
    return 0;
};


exports.verifyCountriesInfo = function (){
    CountryInfo.model.count (
        function (err, result){
            if (err) {
                throw err;
            }

            if (result === 0){
                var filePath = process.env.COUNTRIES_PRICES_FILE || '../Twilio\ -\ Voice\ Prices.csv';
                initializeCountryInfo(filePath);
            }
        }
    )
};