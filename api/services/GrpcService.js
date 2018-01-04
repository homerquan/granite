/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of engine. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-12 11:19:45
 * @Last Modified by:   Homer
 * @Last Modified time: 2018-01-03 23:30:50
 */

const grpc = require('grpc');
const config = require('../../config/services/grpc');
const messages = require('../grpc/engine/input_pb');
const services = require('../grpc/engine/input_grpc_pb');
const grpcExectuter = require ('../grpc/executer');

// server
const engineOutputService = grpc.load(__dirname + '/../grpc/engine/output.proto').output

// client
const client = new services.CommandsClient(config.services.grpc.conn, grpc.credentials.createInsecure());

function getResponse(request,cb) {
   grpcExectuter(request,cb);
}

function ask(call, cb) {
  getResponse(call.request, cb);
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