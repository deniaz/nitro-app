'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var router = require('./router');
var hbs = require('hbs');

var app;
var config;

function createApp(port, callback) {
	app = express();
	app.use(router(config));
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.set('view engine', config.nitro.view_file_extension);
	app.set('views', config.nitro.view_directory);

	app.listen(port, callback.apply(undefined, [ app ]));
}

function addHelper(name) {
	hbs.registerHelper(name, require(config.nitro.helpers_directory + name));
}

module.exports = function(cfg) {
	config = cfg;
	return {
		start: createApp,
		addHelper: addHelper
	}
}