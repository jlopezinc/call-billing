'use strict';

var CountryInfo = require('../model/countryInfo').model;


var initializeCountryInfo = function (filePath, successCallback){
    getCountryInfoFromFile(filePath, function (jsonData) {
        console.info('Saving countries voice prices: ' + JSON.stringify(jsonData));
        CountryInfo.create(jsonData, function (err) {
            if (err) {
                throw err;
            }
            successCallback();
        });
    });
};

var getCountryInfoFromFile = function (filePath, successCallback){
    var parserMgr=require("csvtojson").parserMgr;

    // change column name to camel case convention
    parserMgr.addParser('nameParser', 'Name', function (params){
       params.resultRow['name'] = params.item;
    });

    // change column name to camel case convention
    parserMgr.addParser('rateParser', 'Rate', function (params){
        params.resultRow['rate'] = Number(params.item);
    });

    parserMgr.addParser('phoneStartsWithParser', 'Phone Numbers that Start With',function (params){
        // first remove whitespace from item.
        var splitted = params.item.replace(/ /g,'').split(",");
        var array = [];
        if (splitted instanceof Array){
            for (var i = 0; i < splitted.length; i++){
                array.push(splitted[i]);
            }
        } else if (splitted){
            array.push(splitted)
        }
        params.resultRow['phoneStartsWith'] = array;
    });


    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    converter.fromFile(filePath, function(err,result){
        if (err){
            console.error("Error retrieving countries info JSON data", err);
            throw err;
        }
        successCallback(result);
    });
};


exports.calculateCost = function (data, successCallback){
    this.verifyCountriesInfo(function (){
        successCallback(0);
    });
};


exports.verifyCountriesInfo = function (successCallback){
    CountryInfo.count (
        function (err, result){
            if (err) {
                throw err;
            }

            if (result === 0){
                var filePath = process.env.COUNTRIES_PRICES_FILE || './Twilio - Voice Prices.csv';
                initializeCountryInfo(filePath, successCallback);
            } else {
                successCallback();
            }
        }
    )
};

exports.getCountryInfoFromFile = getCountryInfoFromFile;

