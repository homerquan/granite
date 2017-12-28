"use strict";

/**
 * Start to receive engine outputs from redis
 */

const _ = require("lodash");

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
      RedisService.sub.psubscribe("CONVOSPOT-MESSAGE:*");
      RedisService.sub.psubscribe("CONVOSPOT-CONVOSATION:*");
      RedisService.sub.psubscribe("CONVOSPOT-INTENTIONS:*");
      RedisService.sub.psubscribe("CONVOSPOT-ACTIONS:*");
      RedisService.sub.on("pmessage", function(pattern, channel, payload) {
        let data = null;
        if (pattern === "CONVOSPOT-MESSAGE:*") {
          data = safeParse(payload);
          if (data) {
            let message = {
              text: data.text,
              source: data.source,
              sourceId: data.helper,
              conversation: data.conversation,
              type: "language",
              destination: "visitor",
              destinationId: data.visitor
            };
            Message.create(message).exec(function(err, msg) {
              if (err) {
                sails.error("error in create a new message");
              } else sails.log("create a new message", msg.id);
            });
          }
        } else if (pattern === "CONVOSPOT-CONVOSATION:*") {
          data = safeParse(payload);
          if (data) {
            Conversation.update(
              { id: data.id },
              {
                intentions: data.intentions,
                actions: data.actions
              }
            ).exec(function(err, msg) {
              if (err) {
                sails.error("error in update a conversation");
              } else sails.log("update a conversation", msg.id);
            });
          }
        } else if (pattern === "CONVOSPOT-INTENTIONS:*") {
          data = safeParse(payload);
          if (data) {
            Conversation.update(
              { id: data.id },
              {
                intentions: data.intentions
              }
            ).exec(function(err, msg) {
              if (err) {
                sails.error("error in update a conversation intentions");
              } else sails.log("update a conversation intentions", msg.id);
            });
          }
        } else if (pattern === "CONVOSPOT-ACTIONS:*") {
          data = safeParse(payload);
          if (data) {
            Conversation.update(
              { id: data.id },
              {
                actions: data.actions
              }
            ).exec(function(err, msg) {
              if (err) {
                sails.error("error in update a conversation actions");
              } else sails.log("update a conversation actions", msg.id);
            });
          }
        }
      });
      cb();
    }
  };
};
