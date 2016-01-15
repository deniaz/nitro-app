'use strict';

var fs = require('fs');

function readFile(path) {
	return fs.readFileSync(path, {
		encoding: 'utf-8',
		flag: 'r'
	});
}

function parseJSON(data) {
	return JSON.parse(data);
}

function read(path) {
	return parseJSON(
		readFile(path)
	);
}

module.exports = read;