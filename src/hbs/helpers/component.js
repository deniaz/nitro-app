/**
 * Terrific Nitro App
 * Copyright (c) 2016 Robert Vogt <robert.vogt@namics.com>
 * MIT Licensed
 */

'use strict';

var fs = require('fs');
var path = require('path');
var hbs = require('hbs');

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
function getFilePath(name, variant, config, component) {
	if (variant) {
		var file = name + '-' + variant + '.' + config.nitro.view_file_extension;
	} else {
		var file = name + '.' + config.nitro.view_file_extension;
	}

	return path.join(
		config.base_path,
		component.path,
		'/',
		name,
		'/',
		file
	);
}

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
}

/**
 * Parses JSON from string.
 * @param raw
 */
function parseJson(raw) {
	return JSON.parse(raw);
}

/**
 * Readers Component Data from data.json
 * @param name
 * @param variant
 * @param config
 * @param component
 * @returns {*}
 */
function getComponentData(name, variant, config, component) {
	if (variant) {
		var file = name + '-' + variant + '.json';
	} else {
		var file = name + '.json';
	}

	var fullPath = path.join(
		config.base_path,
		component.path,
		'/',
		name,
		'/_data',
		file
	);

	if (variant) {
		try {
			return parseJson(
				readFile(fullPath)
			);
		} catch(e) {
			console.log('Reading default data-file instead of variant...');
			file = name + '.json';
			fullPath = path.join(
				config.nitro.base_path,
				component.path,
				'/',
				name,
				'/_data',
				file
			);
		}
	}

	try {
		return parseJson(
			readFile(fullPath)
		);
	} catch(e) {
		console.log('Could not read data.json: ' + e.message);
		return {};
	}
}

/**
 * Transforms name parameter.
 * @param name
 * @returns {string}
 */
function transformName(name) {
	return name.toLowerCase();
}

/**
 * Transforms variant parameter.
 *
 * @param variant
 * @returns {*}
 */
function transformVariant(variant) {
	if (typeof variant === 'string') {
		return variant.toLowerCase();
	} else {
		return null;
	}
}

/**
 * Curry for handlebars helper function.
 * @param config
 * @returns {Function}
 */
function createHelper(config) {
	return function(name, variant) {
		name = transformName(name);
		variant = transformVariant(variant);

		for (var key in config.nitro.components) {
			var component = config.nitro.components[key];
			if (component.hasOwnProperty('path')) {
				var fullPath = getFilePath(name, variant, config, component);
				var data = getComponentData(name, variant, config, component);

				if (fs.existsSync(fullPath)) {
					return render(fullPath, data);
				}
			}
		}
	};
}

module.exports = createHelper;