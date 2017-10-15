"use strict";

/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports = {
  disableAuth: false,
  policies: {	
    '*': ['isAuthenticated'],
    AuthController: {
      'signin': true,
      'authBot': true,
      'signup': true,
      'refresh_token':['isAuthenticated'],
      'replace_token':['isAuthenticated']
    },
    ConversationController: {
      'add': ['isAuthenticated'],
      'find': ['isLoggedIn'],
      'findone': ['isAdmin','isOwner'],
      'update': ['isAdmin','isOwner'],
      'remove': ['isAdmin','isOwner']
    }
  }
};
