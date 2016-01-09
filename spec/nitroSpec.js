'use strict';

var path = require('path');

describe('Terrific Nitro App', function() {
	var mock = {
		nitro: {
			base_path: '',
			components: {
				"atoms": {}
			}
		}
	};
	var app;

	beforeAll(function() {
		app = require('nitro')(
			require('nitro/config')(mock)
		);
	});

	it('has a start method', function() {
		expect(app.start).toEqual(jasmine.any(Function));
	});

	it('has an addHelper method', function() {
		expect(app.addHelper).toEqual(jasmine.any(Function));
	});

	it('tests the start method with its callback function', function() {
		expect(true).toBe(false);
	});
});