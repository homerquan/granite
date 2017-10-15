"use strict";

/**
 * AuthController
 * @description :: Server-side logic for manage users' authorization
 */

const _ = require('lodash');
const passport = require('passport');

module.exports = {
  /**
   * Sign in by email\password
   * @param req
   * @param res
   */
  signin(req, res) {
    passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  /**
   * Sign in by bot_id\token
   * @param req
   * @param res
   */
  authBot(req, res) {
    passport.authenticate('bot-widget', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  /**
   * Replace JSON Web Token from bot auth into convo auth
   * @param req
   * @param res
   */
  replace_token(req, res) {
    passport.authenticate('convo-widget', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  /**
   * Sign up by email\password
   * @param req
   * @param res
   */
  signup(req, res) {
    const values = _.omit(req.allParams(), 'id');

    User
      .create(values)
      .then(user => {
        return {token: CipherService.jwt.encodeSync({id: user.id}), user: user}
      })
      .then(res.created)
      .catch(res.negotiate);
  },

  /**
   * Authorization via social networks
   * @param req
   * @param res
   */
  social(req, res) {
    const type = req.param('type') ? req.param('type').toLowerCase() : '-';
    const strategyName = [type, 'token'].join('-');

    if (Object.keys(passport._strategies).indexOf(strategyName) === -1) {
      return res.badRequest(null, {message: [type, ' is not supported'].join('')});
    }

    passport.authenticate('jwt', (error, user, info) => {
      req.user = user;
      passport.authenticate(strategyName, _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
    })(req, res);
  },

  /**
   * Accept JSON Web Token and updates with new one
   * @param req
   * @param res
   */
  refresh_token(req, res) {
    if (!req.param('token')) return res.badRequest(null, {message: 'You must provide token parameter'});

    const oldDecoded = CipherService.jwt.decodeSync(req.param('token'));

    res.ok({
      token: CipherService.jwt.encodeSync({id: oldDecoded.id})
    });
  }

};
