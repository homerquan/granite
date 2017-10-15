"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

const passport = require('passport');

module.exports = (req, res, next) => {
	if (sails.config.disableAuth) {
		next();
	} else {
		// Using two ways to auth visitor and dashboard user
		// for visitors, checking the token associated with bot and hostname
		// for dashboard users, checking login token
		passport.authenticate('jwt', (error, user, info) => {
			if (error || !user) return res.negotiate(error || info);
			req.user = user;
			next();
		})(req, res);
	}
};