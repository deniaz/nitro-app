'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

var config;
var routes = {};

function resolveView(req, res, next) {
	var urlPath = req.path ? path.basename(req.path, path.extname(req.path)) : 'index';

	function hasRoute(urlPath) {
		return routes.hasOwnProperty(urlPath);
	}

	if (hasRoute(urlPath)) {
		res.render(routes[urlPath]);
	} else {
		routes = createRoutes(config);
		if (hasRoute(urlPath)) {
			res.render(routes[urlPath]);
		} else {
			next();
		}
	}
}

function errorView(req, res) {
	res.status(404);
	res.render('404', function(err, html) {
		if (err) {
			res.send('404 - Not Found');
		}

		res.send(html);
	})
}

function createRouteVariants(cleanRoute) {
	var variants = [];

	if (cleanRoute !== cleanRoute.replace(/\//gi, '-')) {
		variants.push(cleanRoute.replace(/\//gi, '-'));
	}

	if (cleanRoute !== cleanRoute.replace(/_/gi, '-')) {
		variants.push(cleanRoute.replace(/_/gi, '-'));
	}

	return variants;
}

function createRoutes(config) {
	var viewDir = config.nitro.view_directory;
	var files = fs.readdirSync(viewDir);
	var routes = [];

	files.forEach(function(el) {
		var stats = fs.lstatSync(viewDir + '/' + el);
		if (stats.isFile()) {
			var cleanFileName = path.basename(el, path.extname(el));
			routes[cleanFileName] = el;

			var variants = createRouteVariants(cleanFileName);
			if (variants.length > 0) {
				variants.forEach(function(variant) {
					routes[variant] = el;
				});
			}
		}
	});

	return routes;
}

function createRouter(cfg) {
	config = cfg;
	routes = createRoutes(config);

	var router = express.Router({
		caseSensitive: false,
		strict: false
	});

	router.get('/', resolveView);
	router.get('/:view', resolveView);

	router.use(errorView);

	return router;
}

module.exports = createRouter;