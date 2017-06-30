var api = '/api/v1';
var express = require('express');
var router = express.Router();

module.exports = function (app) {
	app.use(api, require('./uptoken'));
	app.use(api, require('./login'));
	app.use(api, require('./register'));
	app.use(api, require('./user'));
};
