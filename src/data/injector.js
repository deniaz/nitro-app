'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Loads default data.json
 * @param component_dir
 * @param name
 * @returns {*}
 */
function loadDefaultJSON(component_dir, name) {
	return parseJSON(
		readFile(component_dir + '/_data/' + name + '.json')
	);
};

/**
 * Parses string to JSON.
 * @param content
 */
function parseJSON(content) {
	return JSON.parse(content);
};

/**
 * Reads file from disk.
 * @param path
 * @returns {*}
 */
function readFile(path) {
	return fs.readFileSync(path, {
		encoding: 'utf-8',
		flag: 'r'
	});
};

/**
 * Loads data-JSON. It tries to find a variant file.
 * @param component_dir
 * @param name
 * @param variant
 * @returns {*}
 */
function loadJSON(component_dir, name, variant) {
	if (variant) {
		var fileName = name + '-' + variant + '.json';
		var path = component_dir + '/_data/' + fileName;
		try {
			return parseJSON(
				readFile(path)
			);
		} catch(e) {
			console.log('Reading default data-file instead of variant...');
		}
	}

	try {
		return loadDefaultJSON(component_dir, name);
	} catch(e) {
		console.log('Could not read data.json: ' + e.message);
		return {};
	}
}

module.exports = loadJSON;