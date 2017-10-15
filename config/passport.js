"use strict";

/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */

const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const FacebookTokenStrategy = require('passport-facebook-token');
// const TwitterTokenStrategy = require('passport-twitter-token');
// const VKontakteTokenStrategy = require('passport-vkontakte-token');
// const FoursquareTokenStrategy = require('passport-foursquare-token');
// const GitHubTokenStrategy = require('passport-github-token');
// const InstagramTokenStrategy = require('passport-instagram-token');
// const PayPalTokenStrategy = require('passport-paypal-token');
// const RedditTokenStrategy = require('passport-reddit-token');
// const SoundCloudTokenStrategy = require('passport-soundcloud-token');
// const WindowsLiveTokenStrategy = require('passport-windows-live-token');
// const TwitchTokenStrategy = require('passport-twitch-token');
// const YandexTokenStrategy = require('passport-yandex-token');
// const AmazonTokenStrategy = require('passport-amazon-token');
// const GooglePlusTokenStrategy = require('passport-google-plus-token');
// const YahooTokenStrategy = require('passport-yahoo-token');

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */
const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
};

/**
 * Configuration object for bot widget strategy
 * @type {Object}
 * @private
 */
const BOT_WIDGET_STRATEGY_CONFIG = {
    usernameField: 'bid',
    passwordField: 'token',
    session: false,
    passReqToCallback: true
};

/**
 * Configuration object for conversation widget strategy
 * @type {Object}
 * @private
 */
const CONVO_WIDGET_STRATEGY_CONFIG = {
    usernameField: 'cid',
    passwordField: 'token',
    session: false,
    passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
    secretOrKey: process.env.JWT_SECRETS || '08f1af67cddd127b6f2122ce7a05cf5ef171c199a350687d3c8d8ed62b03642c',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    tokenQueryParameterName: 'access_token',
    session: false,
    passReqToCallback: true
};

/**
 * Configuration object for social strategies
 * @type {Object}
 * @private
 */
const SOCIAL_STRATEGY_CONFIG = {
    clientID: '-',
    clientSecret: '-',
    consumerKey: '-',
    consumerSecret: '-',
    passReqToCallback: true
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLocalStrategyAuth = (req, username, password, next) => {
    User
        .findOne({
            [LOCAL_STRATEGY_CONFIG.usernameField]: username
        })
        .then(user => {
            if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);
            if (!HashService.bcrypt.compareSync(password, user.password)) return next(null, null, sails.config.errors.USER_NOT_FOUND);
            return next(null, user, {});
        })
        .catch(next);
};

const _onBotWidgetStrategyAuth = (req, bid, token, next) => {
    // TODO: also compare hostname 
    var host = req.host;
    Bot
        .findOne({
            id: bid
        })
        .then(bot => {
            if (!bot) return next(null, null, sails.config.errors.BOT_NOT_FOUND);
            if (bot.token !== token) return next(null, null, sails.config.errors.BOT_TOKEN_NOT_COREECT);
            if (sails.config.featureFlags.isFeatureEnabled('widgetAuthCheckHost')) {
                if (bot.host !== host) return next(null, null, sails.config.errors.BOT_HOST_NOT_MATCH);
            }
            return next(null, bot, {});
        })
        .catch(next);
};

const _onConvoWidgetStrategyAuth = (req, cid, token, next) => {
    Conversation
        .findOne({
            id: cid
        })
        .then(convo => {
            if (!convo) return next(null, null, sails.config.errors.CONVO_NOT_FOUND);
            if (convo.token !== token) return next(null, null, sails.config.errors.CONVO_TOKEN_NOT_COREECT);
            return next(null, convo, {});
        })
        .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = (req, payload, next) => {
    if (req.header('convospot-client') === 'bot-widget' && req.header('convospot-extra') === 'create-convo-by-bot') {
        Bot
            .findOne({
                id: payload.id
            })
            .then(bot => {
                if (!bot) return next(null, null, sails.config.errors.JWT_NOT_VALID);
                req.body._bot = bot.id; //overwrite to verified bot
                return next(null, bot, {});
            })
            .catch(next);
    } else if (req.header('convospot-client') === 'bot-widget') {
        Conversation
            .findOne({
                id: payload.id
            })
            .then(convo => {
                if (!convo) return next(null, null, sails.config.errors.JWT_NOT_VALID);
                req.body._conversation = convo.id; //overwrite to verified conversation
                req.body.source = 'widget';
                return next(null, convo, {});
            })
            .catch(next);
    } else if (req.header('convospot-client') === 'console') {
        // TODO: Ask console if the user is valid
        return next(null,{},{});        
    } else {
        User
            .findOne({
                id: payload.id
            })
            .then(user => {
                if (!user) return next(null, null, sails.config.errors.JWT_NOT_VALID);
                return next(null, user, {});
            })
            .catch(next);
    }
};

/**
 * Triggers when user authenticates via one of social strategies
 * @param {Object} req Request object
 * @param {String} accessToken Access token from social network
 * @param {String} refreshToken Refresh token from social network
 * @param {Object} profile Social profile
 * @param {Function} next Callback
 * @private
 */
const _onSocialStrategyAuth = (req, accessToken, refreshToken, profile, next) => {
    if (!req.user) {
        let criteria = {};
        criteria['socialProfiles.' + profile.provider + '.id'] = profile.id;

        let model = {
            username: profile.username || profile.displayName || '',
            email: (profile.emails[0] && profile.emails[0].value) || '',
            firstName: (profile.name && profile.name.givenName) || '',
            lastName: (profile.name && profile.name.familyName) || '',
            photo: (profile.photos[0] && profile.photos[0].value) || '',
            socialProfiles: {}
        };
        model.socialProfiles[profile.provider] = profile._json;

        User
            .findOrCreate(criteria, model)
            .then(user => {
                if (!user) return next(null, null, sails.config.errors.AUTH_FAILED);
                return next(null, user, {});
            })
            .catch(next);
    } else {
        req.user.socialProfiles[profile.provider] = profile._json;
        req.user.save(next);
    }
};

module.exports = {
    passport: {
        /**
         * Triggers when all Passport steps is done and user profile is parsed
         * @param {Object} req Request object
         * @param {Object} res Response object
         * @param {Object} error Object with error info
         * @param {Object} entity object (could be user or bot)
         * @param {Object} info Information object
         * @returns {*}
         * @private
         */
        onPassportAuth(req, res, error, entity, info) {
            if (error || !entity) return res.negotiate(error || info);

            return res.ok({
                token: CipherService.jwt.encodeSync({
                    id: entity.id
                }),
                entity: entity
            });
        }
    }
};

passport.use('bot-widget', new LocalStrategy(_.assign({}, BOT_WIDGET_STRATEGY_CONFIG), _onBotWidgetStrategyAuth));
passport.use('convo-widget', new LocalStrategy(_.assign({}, CONVO_WIDGET_STRATEGY_CONFIG), _onConvoWidgetStrategyAuth));
passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
// passport.use(new FacebookTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new TwitterTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new VKontakteTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new FoursquareTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new GitHubTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new InstagramTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new PayPalTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new RedditTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new SoundCloudTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new WindowsLiveTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new TwitchTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new YandexTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new AmazonTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new GooglePlusTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));
// passport.use(new YahooTokenStrategy(_.assign({}, SOCIAL_STRATEGY_CONFIG), _onSocialStrategyAuth));