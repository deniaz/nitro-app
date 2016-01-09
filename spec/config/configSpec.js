'use strict';

var path = require('path');

describe('Terrific Config', function() {
	var mock = {
		nitro: {
			base_path: '',
			components: {
				"atoms": {}
			}
		}
	};

	var config = require('nitro/config');
	var cfg;

	beforeAll(function() {
		cfg = config(mock);
	})

	it('is a currying function', function() {
		expect(config).toEqual(jasmine.any(Function));
	});

	it('contains the base path', function() {
		expect(cfg.nitro.base_path).toBeDefined();
	});

	it('contains the view file extension', function() {
		expect(cfg.nitro.view_file_extension).toBeDefined();
	});

	it('contains the view directory', function() {
		expect(cfg.nitro.view_directory).toBeDefined();
	});

	it('contains the handlebars helper directory', function() {
		expect(cfg.nitro.helpers_directory).toBeDefined();
	});

	it('contains the partials directory', function() {
		expect(cfg.nitro.view_partials_directory).toBeDefined();
	});

	it('contains a component map', function() {
		expect(cfg.nitro.components).toBeDefined();
		expect(cfg.nitro.components).toEqual(jasmine.any(Object));
	});
});