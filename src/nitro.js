/**
 * Terrific Nitro App
 * Copyright (c) 2016 Robert Vogt <robert.vogt@namics.com>
 * MIT Licensed
 */

'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var router = require('./router');
var hbs = require('hbs');

/**
 * Express App Instance
 * @private
 */
var app = express();

/**
 * nitro/config Instance
 * @private
 */
var config;

/**
 * Creates express app with default middleware.
 *
 * @param port
 * @param callback {fn(app)}
 */
function createApp(port, callback) {
	app.use(router(config));
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.set('view engine', config.nitro.view_file_extension);
	app.set('views', config.nitro.view_directory);

	app.listen(port, callback.apply(undefined, [ app ]));
}

/**
 * Adds a custom handlebars helper to the hbs instance
 * @param name
 */
function addHelper(name) {
	hbs.registerHelper(name, require(config.nitro.helpers_directory + name));
}

/**
 * @param cfg nitro/config Object
 * @returns {{start: createApp, addHelper: addHelper}}
 */
module.exports = function(cfg) {
	config = cfg;
	return {
		__app: app,
		start: createApp,
		addHelper: addHelper
	}
}