"use strict";

/**
 * Conversation
 * @description :: Model for storing Conversation records
 */

module.exports = {
    attributes: {
        status: {
            type: 'string',
            enum: ['online', 'off']
        },
        context: {
            type: 'json'
        },
        mode: {
            type: 'string',
            enum: ['auto', 'semi', 'manual'],
            defaultsTo: 'auto'
        },
        token: {
            type: 'string',
            defaultsTo: () => {
                return TokenService.gen();
            }
        },
        _bot: {
            model: 'Bot'
        },
        _owner: {
            model: 'User'
        },
        _client: {
            model: 'Client'
        }
    },
    afterCreate: (values, next) => {
        SenecaService.act('convospot-console', 'create_conversation', values);
        next();
    }
};
