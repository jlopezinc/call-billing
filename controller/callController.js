'use strict';

var Account = require('../model/account'),
    Call = require('../model/call');

var validateNewCall = function (receivedCall){

};

exports.processNewCall = function (req, res, next){

};


exports.findAccountByName = function (req, res, next, name){
    Account.model.findOne({'name': name}, function (err, result){
        if (err){
            return next(err);
        }

        if (!result){
            res.sendStatus(204);
            return;
        }

        req.account = result;
        next();
    });
};

exports.insertAccount = function (req, res){
    var account = new Account.model(req.body);

    account.save(function (err){
        if (err) {
            return res.json(500, {
                error: 'Cannot save the article',
                errorDetail: JSON.stringify(err)
            });
        }
        res.json(account);
    });
};
