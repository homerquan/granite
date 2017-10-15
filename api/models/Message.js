"use strict";

const _ = require('lodash');

/**
 * Message
 * @description :: Model for storing Message records
 */

module.exports = {
    attributes: {
        text: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        data: {
            type: 'object'
        },
        source: {
            type: 'string'
        },
        acknowledged: {
            type: 'boolean'
        },
        _conversation: {
            model: 'Conversation'
        },
        _owner: {
            model: 'User'
        },
        _client: {
            model: 'Client'
        }
    },
    afterCreate: (values, next) => {
        values.modelName = 'message';
        //Using dedicated socket servers for widget and console
        SenecaService.act('convospot-socket', 'create_message', values);
        SenecaService.act('convospot-console', 'create_message', values);
        
        //TODO handle error
        if (values.source === 'widget') {
            // The engine will check if the question can be answered by engine (e.g., confidential score)
            // If not ask the real human
            _.delay(function() {
                SenecaService.act('convospot-engine', 'ask', values);
                SenecaService.act('convospot-socket', 'start_ask_engine', values);
            }, 2000);
        }
        next();
    }
};
