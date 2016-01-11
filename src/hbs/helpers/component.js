/**
 * Terrific Nitro App
 * Copyright (c) 2016 Robert Vogt <robert.vogt@namics.com>
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var path = require('path');
var hbs = require('hbs');
var injector = require('../../data/injector');
var argumentParser = require('./argument-parser');

/**
 * Renders Template.
 * 
 * @param template
 * @param data
 * @returns {*}
 */
function render(template, data) {
	return new hbs.handlebars.SafeString(
		hbs.handlebars.compile(fs.readFileSync(template, 'utf-8')).apply(undefined, [ data ])
	);
}

/**
 * Gets a file's full path.
 *
 * @param name
 * @param variant
 * @param config
 * @param component
 * @returns {string}
 */
function getPathInfo(name, variant, config, component) {
	if (variant) {
		var file = name + '-' + variant + '.' + config.nitro.view_file_extension;
	} else {
		var file = name + '.' + config.nitro.view_file_extension;
	}

	return {
		full_path: path.join(
			config.base_path,
			component.path,
			'/',
			name,
			'/',
			file
		),
		component_dir: path.join(
			config.base_path,
			component.path,
			'/',
			name
		)
	};
}

/**
 * Curry for handlebars helper function.
 * @param config
 * @returns {Function}
 */
function createHelper(config) {
	return function() {
		var args = argumentParser(arguments);
		var name = args.name;
		var variant = args.variant;

		for (var key in config.nitro.components) {
			var component = config.nitro.components[key];
			if (component.hasOwnProperty('path')) {
				var info = getPathInfo(name, variant, config, component);
				var data = injector(info.component_dir, name, variant);

				if (fs.existsSync(info.full_path)) {
					return render(info.full_path, data);
				}
			}
		}
	};
}

module.exports = createHelper;