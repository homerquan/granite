"use strict";

/**
 * Conversation
 * @description :: Model for storing Conversation records
 */

module.exports = {
    attributes: {
        context: {
            type: 'json'
        },
        mode: {
            type: 'string',
            enum: ['auto', 'semi', 'manual'],
            defaultsTo: 'semi'
        },
        token: {
            type: 'string',
            defaultsTo: () => {
                return TokenService.gen();
            }
        },
        visitor: {
            model: 'Visitor'
        },
        user: {
            model: 'User'
        },
        bot: {
            model: 'Bot'
        },
        client: {
            model: 'Client'
        }
    },
    beforeCreate: (values, next) => {
        // using bot client as entity client
        if(values.bot && !values.client) {
            Bot.findOne({id:values.bot},function(err,bot){
                values.client=bot.client;
                next();
            })
        } else {
            next();
        }
    },
    afterCreate: (values, next) => {
        //SenecaService.act('convospot-console', 'create_conversation', values);
        let req = {
            message: '',
            typeCode: 206,
            type: 'create_conversation',
            data: JSON.stringify({
                id: values.id,
                bot: values.bot,
                client: values.client
            })
        };
        GrpcService.ask(req, function(err, resp) {
            if (err)
                sails.log.error('error:', err);
            else {
                sails.log.debug('response:', resp);
                let req = {
                    message: '',
                    typeCode: 207,
                    type: 'join_conversation',
                    data: JSON.stringify({
                        conversation: values.id,
                        visitor: values.visitor,
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

            }
        });
        next();
    }
};