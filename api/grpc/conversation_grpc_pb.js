// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var conversation_pb = require('./conversation_pb.js');

function serialize_conversation_Request(arg) {
  if (!(arg instanceof conversation_pb.Request)) {
    throw new Error('Expected argument of type conversation.Request');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_conversation_Request(buffer_arg) {
  return conversation_pb.Request.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_Response(arg) {
  if (!(arg instanceof conversation_pb.Response)) {
    throw new Error('Expected argument of type conversation.Response');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_conversation_Response(buffer_arg) {
  return conversation_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConversationService = exports.ConversationService = {
  say: {
    path: '/conversation.Conversation/Say',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.Request,
    responseType: conversation_pb.Response,
    requestSerialize: serialize_conversation_Request,
    requestDeserialize: deserialize_conversation_Request,
    responseSerialize: serialize_conversation_Response,
    responseDeserialize: deserialize_conversation_Response,
  },
  talk: {
    path: '/conversation.Conversation/Talk',
    requestStream: true,
    responseStream: true,
    requestType: conversation_pb.Request,
    responseType: conversation_pb.Response,
    requestSerialize: serialize_conversation_Request,
    requestDeserialize: deserialize_conversation_Request,
    responseSerialize: serialize_conversation_Response,
    responseDeserialize: deserialize_conversation_Response,
  },
  ask: {
    path: '/conversation.Conversation/Ask',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.Request,
    responseType: conversation_pb.Response,
    requestSerialize: serialize_conversation_Request,
    requestDeserialize: deserialize_conversation_Request,
    responseSerialize: serialize_conversation_Response,
    responseDeserialize: deserialize_conversation_Response,
  },
};

exports.ConversationClient = grpc.makeGenericClientConstructor(ConversationService);
