/**
 * Terrific Nitro App
 * Copyright (c) 2016 Robert Vogt <robert.vogt@namics.com>
 * MIT Licensed
 */

'use strict';

var hbs = require('hbs');
var hbsUtils = require('hbs-utils')(hbs);

/**
 * nitro/config instance
 * @private
 */
var config;

/**
 * List of Nitro helpers.
 * @type {string[]}
 */
var helpers = [ 'component' ];

/**
 * Registers Partials Directory.
 * @private
 * @param directory
 */
function registerPartials(directory) {
	hbsUtils.registerWatchedPartials(directory);
}

/**
 * Add Nitro-specific handlebars helpers.
 * @private
 */
function registerNitroHelpers() {
	helpers.forEach(function(helper) {
		hbs.registerHelper(
			helper,
			require('./helpers/' + helper)(config)
		);
	});
}

/**
 * Adds Nitro-specific handlebars add-ons and registers hbs as template engine.
 * @param app
 * @param cfg
 */
function initialize(app, cfg) {
	config = cfg;
	registerPartials(config.nitro.view_partials_directory);
	registerNitroHelpers();

	app.engine(config.nitro.view_file_extension, hbs.__express);
}

module.exports = initialize;