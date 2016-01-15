'use strict';

var path = require('path');

var reader = require('./reader');

function getViewData(dir, template) {
	var file = template.replace(path.extname(template), '');
	var dataPath = dir + '/' + file + '.json';

	try {
		return reader(dataPath);
	} catch (e) {
		console.log('Could not read data file: ' + e.message);
	}

	return {};
}

module.exports = getViewData;