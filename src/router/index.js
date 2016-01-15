/**
 * Terrific Nitro App
 * Copyright (c) 2016 Robert Vogt <robert.vogt@namics.com>
 * MIT Licensed
 */

'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var injector = require('../data/view');

var regExpList = [
	/\//gi,
	/_/gi
];

/**
 * nitro/config Instance
 * @private
 */
var config;

/**
 * Map containing all possible routes with corresponding view files.
 * @private
 */
var routes = {};

/**
 * Find view template based on URL path.
 *
 * If no view is found, the routes-list is regenerated to find newly generated templates.
 * @param req
 * @param res
 * @param next
 */
function resolveView(req, res, next) {
	var urlPath = req.path ? path.basename(req.path, path.extname(req.path)) : 'index';

	function hasRoute(urlPath) {
		return routes.hasOwnProperty(urlPath);
	}

	if (hasRoute(urlPath)) {
		render(res, urlPath);
	} else {
		// Regenerate routes if route was not found, in case view file was created after nitro was started.
		createRoutes();
		if (hasRoute(urlPath)) {
			render(res, urlPath);
		} else {
			next();
		}
	}
}

function render(res, urlPath) {
	res.locals = {
		view_data: injector(config.nitro.view_data_directory, routes[urlPath])
	}

	res.render(routes[urlPath], res.locals.view_data);
}

/**
 * Error Handler.
 *
 * @param req
 * @param res
 */
function errorView(req, res) {
	res.status(404);
	res.render('404', function(err, html) {
		if (err) {
			res.send('404 - Not Found');
		}

		res.send(html);
	})
}

/**
 * Create Route Variants (special character replacements).
 *
 * @param cleanRoute
 * @returns {Array} List of route variants.
 */
function createRouteVariants(cleanRoute, filePath) {
	routes[cleanRoute] = filePath;

	regExpList.forEach(function(regExp) {
		if (cleanRoute !== cleanRoute.replace(regExp, '-')) {
			routes[cleanRoute.replace(regExp, '-')] = filePath;
		}
	});
}

function isValidDirectory(directory) {
	return (
		directory !== path.basename(config.nitro.view_partials_directory) &&
		directory !== path.basename(config.nitro.view_data_directory)
	);
}

/**
 * Creates route map based on view templates in view directory.
 *
 * @param config
 * @returns {Array}
 */
function createRoutes() {
	var viewDir = config.nitro.view_directory;
	var files = fs.readdirSync(viewDir);

	files.forEach(function(el) {
		var stats = fs.lstatSync(viewDir + '/' + el);
		if (stats.isFile()) {
			var cleanFileName = path.basename(el, path.extname(el));
			createRouteVariants(cleanFileName, el);
		} else if (stats.isDirectory() && isValidDirectory(el)) {
			fs.readdirSync(viewDir + '/' + el).forEach(function(file) {
				var stats = fs.lstatSync(viewDir + '/' + el + '/' + file);

				if (stats.isFile()) {
					var cleanFileName = el + '/' + path.basename(el + '/' + file, path.extname(file));
					createRouteVariants(cleanFileName, el + '/' + file);
				}
			});
		}
	});
}

/**
 * Creates and returns express router. Adds Nitro-specific route handlers.
 *
 * @param cfg nitro/config instance
 * @returns Express Router
 */
function createRouter(cfg) {
	config = cfg;
	createRoutes();

	var router = express.Router({
		caseSensitive: false,
		strict: false
	});

	router.use('/', express.static(config.nitro.base_path + '/public'));

	router.get('/', resolveView);
	router.get('/:view', resolveView);

	router.use(errorView);

	return router;
}

module.exports = createRouter;