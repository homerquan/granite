"use strict";

/**
 * isAdmin
 * @description :: Policy that ...
 */

const _ = require('lodash');
const passport = require('passport');
const constants = require('../../config/constants');

module.exports = (req, res, next) => {
	passport.authenticate('jwt', (error, user, info) => {
		if (error || !user) return res.negotiate(error || info);
		if (_.includes(user.roles,constants.get('roles','ADMIN'))) {
			next();
		} else {
		   return res.forbidden();
		}
	})(req, res);
};