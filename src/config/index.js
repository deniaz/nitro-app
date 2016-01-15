/**
 * Terrific Nitro App
 * Copyright (c) 2016 Robert Vogt <robert.vogt@namics.com>
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');
var config = {};

/**
 * Creates and returns Nitro Config Object.
 *
 * Adds reasonable default values and normalizes paths.
 *
 * @param baseDir
 * @returns object
 */
function createConfig(cfg) {
	config = cfg;

	config.nitro = extend(true, {
		view_directory: path.normalize(config.base_path + '/views'),
		view_file_extension: 'html',
		view_partials_directory: path.normalize(config.base_path + '/views/_partials'),
		view_data_directory: path.normalize(config.base_path + '/views/_data'),
		helpers_directory: path.normalize(config.base_path + '/project/helpers/')
	}, config.nitro);

	return config;
}

module.exports = createConfig;