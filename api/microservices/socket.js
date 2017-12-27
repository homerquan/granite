// Microservices for convospot-socket

module.exports = [{
	pattern: 'role:convospot-api,cmd:check_convo',
	action: (msg, cb) => {
		Conversation
			.findOne({
				id: msg.id,
				token: msg.token
			})
			.then(convo => {
				cb(null, {
					data: convo
				});
			})
			.catch(cb);
	}
}, {
	pattern: 'role:convospot-api,cmd:update_conversation_status',
	action: (msg, cb) => {
		Conversation
			.update({
				id: msg.id
			},{
				status: msg.status
			}).then(convo => {
				cb(null, {
					data: convo[0]
				});
			})
			.catch(cb);
	}
}];