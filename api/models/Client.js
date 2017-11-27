"use strict";

/**
 * Client
 * @description :: Model for storing Client records
 */

module.exports = {
	attributes: {
		name: {
			type: 'string'
		},
		owner: {
            model: 'User'
        },
	}
};