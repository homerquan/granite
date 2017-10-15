"use strict";

/**
 * Bot
 * @description :: Model for storing Bot records
 */

module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        host: {
            type: 'string',
            required: true
        },
        welcome: {
            type: 'string'
        },
        mode: {
            type: 'string'
        },
        token: {
            type: 'string',
            defaultsTo: () => {
                return TokenService.gen();
            }
        },
        _owner: {
            model: 'User'
        },
        _client: {
            model: 'Client'
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next()
};
