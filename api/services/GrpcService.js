/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of engine. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-12 11:19:45
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-12 16:44:28
 */

const grpc = require('grpc');
const config = require('../../config/services/grpc');
const messages = require('../grpc/client/conversation_pb');
const services = require('../grpc/client/conversation_grpc_pb');

// server
const engineOutputService = grpc.load(__dirname + '/../grpc/server/outputs.proto').outputs

// client
const client = new services.ConversationClient(config.services.grpc.conn, grpc.credentials.createInsecure());

function getResponse(request) {
  const response = {
  	
  }
  console.log('test ok');
  return response;
}

function ask(call, callback) {
  callback(null, getResponse(call.request));
}

function getServer() {
  const server = new grpc.Server();
  server.addProtoService(engineOutputService.Commands.service, {
  	ask: ask
  });
  return server;
}

var apiGrpcServer = getServer();
apiGrpcServer.bind(config.services.grpc.server, grpc.ServerCredentials.createInsecure());
console.log(`Listening gRPC service at ${config.services.grpc.server}`);
apiGrpcServer.start();

exports = module.exports = {
	ask: function(req, cb) {
		let request = new messages.Request();
		request.setMessage(req.message||'');
		request.setTypecode(req.typeCode||0);
		request.setType(req.type||'');
		request.setData(req.data||{});
		client.ask(request, cb);
	}
}