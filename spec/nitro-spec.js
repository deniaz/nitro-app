'use strict';

var mock = {
		nitro: {
			base_path: '',
			components: {
				"atoms": {}
			}
		}
	};

var path = require('path');
var nitro = require('../');
var config = require('../config');


describe('Terrific Nitro App', function() {

	var app;

	beforeAll(function() {
		app = nitro(config(mock));
	});

	it('has a start method', function() {
		expect(app.start).toEqual(jasmine.any(Function));
	});

	it('has an addHelper method', function() {
		expect(app.addHelper).toEqual(jasmine.any(Function));
	});
});