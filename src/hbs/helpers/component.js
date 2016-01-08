'use strict';

var fs = require('fs');
var path = require('path');
var hbs = require('hbs');

function createHelper(config) {
	return function(name, data) {
		for (var key in config.nitro.components) {
			var component = config.nitro.components[key];
			if (component.hasOwnProperty('path')) {
				var file = name + '.' + config.nitro.view_file_extension;
				var fullPath = path.join(
					config.nitro.base_path,
					component.path,
					'/',
					name,
					'/',
					file
				);

				if (fs.existsSync(fullPath)) {
					return new hbs.handlebars.SafeString(
						hbs.handlebars.compile(fs.readFileSync(fullPath, 'utf-8')).call()
					);
				}
			}
		}
	};
}

module.exports = createHelper;