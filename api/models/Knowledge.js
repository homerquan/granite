/*
* @Author: Homer
* @Date:   2018-01-05 20:36:36
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-05 22:25:53
*/

"use strict";

/**
 * Bot
 * @description :: Model for storing Bot records
 */

module.exports = {
	attributes: {
		raw: {
			type: "string",
			required: true
		},
		text: {
			type: "string"
		},
		bot: {
			model: "Bot"
		},
		client: {
			model: "Client"
		}
	},
	beforeUpdate(values, next) {
		values.text = values.raw.replace(/\s+/g, ' ');
		next();
	},
	beforeCreate(values, next) {
		values.text = values.raw.replace(/\s+/g, ' ');
		next();
	}
};
