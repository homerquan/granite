"use strict";

/**
 * Start to receive engine outputs from redis
 */

const _ = require('lodash');

module.exports = sails => {
  return {
    initialize: cb => {
      RedisService.sub.psubscribe('*');
      RedisService.sub.on('pmessage', function(pattern, channel, message) {
          //TODO: if new message from engine, create its entity
          console.log(channel+message);
      });
      cb();
    }
  }
};
