'use strict';

var fs = require('fs');
var path = require('path');

function loadDefaultJSON(component_dir, name) {
	return parseJSON(
		readFile(component_dir + '/_data/' + name + '.json')
	);
};

function parseJSON(content) {
	return JSON.parse(content);
};

function readFile(path) {
	return fs.readFileSync(path, {
		encoding: 'utf-8',
		flag: 'r'
	});
};

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