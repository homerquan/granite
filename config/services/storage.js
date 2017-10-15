"use strict";
var path = require('path');

module.exports = {
	services: {
		storage: {
			provider: {
				uploads: path.resolve('/tmp')
			}
		}
	}
};