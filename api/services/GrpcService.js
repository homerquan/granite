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
const messages = require('../grpc/conversation_pb');
const services = require('../grpc/conversation_grpc_pb');

const client = new services.ConversationClient(config.services.grpc.conn, grpc.credentials.createInsecure());

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