'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');

var router = require('./router');

var app;

function createApp(port, config, callback) {
	app = express();
	app.use(router(config));
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.set('view engine', config.nitro.view_file_extension);
	app.set('views', config.nitro.view_directory);

	app.listen(port, callback.apply(undefined, [ app ]));
}

module.exports = {
	start: createApp
}