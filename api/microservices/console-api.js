// Microservices for convospot-console-api

module.exports = [{
	pattern: 'role:convospot-api,cmd:list_conversations',
	action: (msg, cb) => {
		Conversation
			.find()
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
}];