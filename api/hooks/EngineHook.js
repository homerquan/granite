"use strict";

/**
 * Start to receive engine outputs from redis
 */

const _ = require('lodash');

function safeParse(str) {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
}

module.exports = sails => {
  return {
    initialize: cb => {
      RedisService.sub.psubscribe('*');
      RedisService.sub.on('pmessage', function(pattern, channel, payload) {
        let data = safeParse(payload);
        if (data) {
          let message = {
            text: data.text,
            source: data.source,
            sourceId: data.helper,
            conversation: data.conversation,
            type: 'language',
            destination: 'visitor',
            destinationId: data.visitor
          };
          Message
            .create(message)
            .exec(function(err, msg) {
              if(err) {
                sails.error('error in create a new message');
              } else 
              sails.log('create a new message', msg.id);
            });
        }
      });
      cb();
    }
  }
};