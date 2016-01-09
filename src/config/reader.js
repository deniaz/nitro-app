'use strict';

var fs = require('fs');
var extend = require('extend');

function readConfig(path) {
	var fullPath = path + '/config.json';

	try {
		return fs.readFileSync(fullPath, {
			encoding: 'utf-8',
			flag: 'r'
		});
	} catch (e) {
		throw Error('config.json could not be read (' + e.message + ')');
	}
}

function parseConfig(data) {
	return JSON.parse(data);
}

function createDefaultConfig(basePath) {
	return extend(true, {
		base_path: basePath
	}, parseConfig(
		readConfig(basePath)
	));
}

module.exports = function(basePath) {
	return createDefaultConfig(basePath);
};