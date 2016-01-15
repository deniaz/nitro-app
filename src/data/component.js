'use strict';

var reader = require('./reader');

function getComponentData(dir, name, variant) {
	if (variant) {
		try {
			return reader(dir + '/_data/' + name + '-' + variant + '.json');
		} catch(e) {
			console.log('Reading default data-file instead of variant...');
		}
	}

	try {
		return reader(dir + '/_data/' + name + '.json');
	} catch(e) {
		console.log('Could not read data.json: ' + e.message);
		return {};
	}
}

module.exports = getComponentData;