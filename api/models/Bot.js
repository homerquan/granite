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
        token: {
            type: 'string',
            defaultsTo: () => {
                return TokenService.gen();
            }
        },
        owner: {
            model: 'User'
        },
        client: {
            model: 'Client'
        }
    },

    beforeUpdate: (values, next) => next(),
    beforeCreate: (values, next) => next(),
    afterCreate: (values, next) => {
        let req = {
            message:'',
            typeCode: 201,
            type: 'create_bot',
            data: JSON.stringify({
                    id: values.id,
                    client: values.client
            })
        };
        GrpcService.ask(req,function(err,resp){
            if (err)
                sails.log.error('error:', err);
            else 
                sails.log.debug('response:', resp);
        });
        next();
    }
};
