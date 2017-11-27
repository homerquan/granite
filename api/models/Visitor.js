"use strict";

/**
 * Visitor
 * @description :: Model for storing visitor records
 */

module.exports = {
	schema: true,

	attributes: {
		intentions: {
			type: 'array'
		},
		cid: {
			type: 'String'  //client unique id (not 100% reliable)
		},
		bot: {
			model: 'Bot'
		},
		client: {
			model: 'Client'
		}
	},

	beforeUpdate: (values, next) => next(),
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
        let req = {
            message:'',
            typeCode: 202,
            type: 'create_visitor',
            data: JSON.stringify({
                    id: values.id,
                    bot: values.bot,
                    client: values.client
            })
        };
        GrpcService.ask(req,function(err,resp){
            if (err)
                sails.log.error('error:', err);
            else {
                sails.log.debug('response:', resp);
            }
        });
        next();
    }
};