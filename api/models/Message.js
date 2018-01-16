"use strict";

import {send as slackSend} from '../../config/slack';
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
        sourceId: {
            type: 'string'
        },
        destination: {
            type: 'string'
        },
        destinationId: {
            type: 'string'
        },
        conversation: {
            model: 'Conversation'
        },
        bot: {
            model: 'Bot'
        },
        client: {
            model: 'Client'
        }
    },
    beforeCreate: (values, next) => {
        // TODO: improve it after mvp
        // using conversation client as entity client
        if (values && values.conversation && !values.client) {
            Conversation.findOne({
                id: values.conversation
            }, function(err, convo) {
                values.bot = convo.bot;
                values.client = convo.client;
                values.destination = "visitor";
                values.destinationId = convo.visitor;
                next();
            })
        } else {
            next();
        }
    },
    afterCreate: (values, next) => {
        values.modelName = 'message';
        SenecaService.act('convospot-socket', 'create_message', values);
        //SenecaService.act('convospot-console', 'create_message', values);
        if (values.source === 'visitor') {
            let req = {
                message: values.text,
                typeCode: 101,
                type: 'say',
                data: JSON.stringify({
                    source: 'visitor',
                    sid: values.sourceId,
                    message: values.text,
                    conversation: values.conversation,
                    bot: values.bot,
                    client: values.client
                })
            }
            GrpcService.ask(req, function(err, resp) {
                if (err)
                    sails.log.error('error:', err);
                else
                    sails.log.debug('response:', resp);
            });
            //TODO: temp
            slackSend(values);
        }
        next();
    }
};