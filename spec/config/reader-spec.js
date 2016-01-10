'use strict';

var fs = require('fs');

var config = { nitro: {} };
var reader = require('../../src/config/reader');

describe('Terrific Config Reader', function() {
	var cfg;

	beforeAll(function() {
		fs.writeFileSync('/tmp/config.json', JSON.stringify(config));
		cfg = reader('/tmp');
	});

	it('is a currying function.', function() {
		expect(reader).toEqual(jasmine.any(Function));
	});

	it('reads the Terrific Config from disk.', function() {
		expect(cfg).toEqual(jasmine.any(Object));
	});

	it('contains the base_path', function() {
		expect(cfg.base_path).toBeDefined();
	});

	it('contains a nitro element', function() {
		expect(cfg.nitro).toBeDefined();
	});
});