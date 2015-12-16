'use strict';

var express = require('express');
var router = express.Router();
var callController = require('../controller/callController');

router.param('name', function (req, res, next, id) {
    callController.findAccountByName(req, res, next, id);
});

router.get('/:name', function(req, res) {
    res.json(req.account);
});

router.post('/', function (req, res) {
    callController.insertAccount(req, res)
});

module.exports = router;