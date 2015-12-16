var expect = require('chai').expect;
//var app = require('./app');
var mongoose = require ('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};


var costCalculator = require('./controller/costCalculator');

describe('Cost calculator', function (){

    it('Should return 7c on one minute web browser call', function (){

        var call = {
            duration: 60,
            accountName: "test1",
            talkdeskAccountName: "+14735348611",
            customerPhoneNumber: "+351961918192",
            forwardPhoneNumber: null
        };
        // talkdesk-number-cost + external-number-cost + profit-margin
        var talkdeskNumberCost = 0.01; // Grenada, default price
        var externalNumberCost = 0.01; // web browser
        var profitMargin = 0.05; //default
        var totalCost = call.duration * (talkdeskNumberCost + externalNumberCost + profitMargin);

        var result = costCalculator.calculateCost(call);
        expect(result).to.equal(totalCost);

    })
});
