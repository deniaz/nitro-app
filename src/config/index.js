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
 * Reads config.json from Nitro's basepaht
 *
 * @param path
 * @returns string
 * @throws Error
 */
function readConfig(path) {
	try {
		return fs.readFileSync(path, {
			encoding: 'utf-8',
			flag: 'r'
		});
	} catch (e) {
		throw Error('config.json could not be read (' + e.message + ')');
	}
}

/**
 * Parses string to a JSON object.
 * @param raw
 * @throws Error
 */
function convertConfig(raw) {
	try {
		return JSON.parse(raw);
	} catch (e) {
		throw Error('config.json could not be parsed (' + e.message + ')');
	}
}

/**
 * Creates and returns Nitro Config Object.
 *
 * Adds reasonable default values and normalizes paths.
 *
 * @param baseDir
 * @returns object
 */
function createConfig(baseDir) {
	config = convertConfig(
		readConfig(baseDir + '/config.json')
	);

	config.nitro = extend(true, {
		base_path: path.normalize(baseDir),
		view_directory: path.normalize(baseDir + '/views'),
		view_file_extension: 'html',
		view_partials_directory: path.normalize(baseDir + '/views/_partials'),
		helpers_directory: path.normalize(baseDir + '/project/helpers/')
	}, config.nitro);

	return config;
}

module.exports = createConfig;