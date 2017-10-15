"use strict";

/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

const prefix = require('./blueprints').blueprints.prefix;

module.exports = {
  routes: {
  	[`post ${prefix}/signup`]: 'AuthController.signup',
  	[`post ${prefix}/signin`]: 'AuthController.signin',
  	[`post ${prefix}/auth_bot`]: 'AuthController.authBot',
  	[`post ${prefix}/refresh_token`]: 'AuthController.refresh_token',
  	[`post ${prefix}/replace_token`]: 'AuthController.replace_token'
  }
};
