'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');
var config = {};

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

function convertConfig(raw) {
	try {
		return JSON.parse(raw);
	} catch (e) {
		throw Error('config.json could not be parsed (' + e.message + ')');
	}
}

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