var expect = require('chai').expect;
var assert = require('chai').assert;
var mongoose = require ('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

// db connection
mongoose.connect('mongodb://localhost/calls', function(err) {
    if(err) {
        console.log('DB connection error', err);
        process.exit(1);
    } else {
        console.log('DB connection successful');
    }
});



var costCalculator = require('./controller/costCalculator');

describe('Cost calculator', function (){

    it('Should return 7c on one minute web browser call', function (done){

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
        var totalCost = call.duration/60.0 * (talkdeskNumberCost + externalNumberCost + profitMargin);

        costCalculator.calculateCost(call, function (result){
            expect(result).to.equal(totalCost);
            done();
        });
    })
});

describe ('Country prices info file import', function (){

    it ('Should return properly JSON data', function (done){
        var filePath = './Twilio - Voice Prices.test.csv';
        var expected = [
            {
                name:  'Afghanistan',
                rate: 0.29,
                phoneStartsWith: ['93']
            },
            {
                name:  'Afghanistan',
                rate: 0.415,
                phoneStartsWith: ['9370', '9372', '9375', '9376', '9377', '9378', '9379']
            },
            {
                name:  'Albania',
                rate: 0.475,
                phoneStartsWith: ['35566', '35567', '35568', '35569']
            },
            {
                name:  'Albania',
                rate: 1.705,
                phoneStartsWith: ['3554249']
            },
            {
                name:  'Burkina Faso',
                rate: 0.29,
                phoneStartsWith: ['226']
            }
        ];


        assert.doesNotThrow(function (){
            costCalculator.getCountryInfoFromFile(filePath, function successCallback(data){
                expect(data).to.eql(expected);
                done();
            });

        });

    })

});
