'use strict';

var hbs = require('hbs');
var hbsUtils = require('hbs-utils')(hbs);

function start(app, config) {
	hbsUtils.registerWatchedPartials(config.nitro.view_partials_directory);
	hbs.registerHelper('component', require('./component')(config));

	app.engine(config.nitro.view_file_extension, hbs.__express);
}

module.exports = {
	start: start
};