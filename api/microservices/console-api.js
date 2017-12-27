// Microservices for convospot-console-api

module.exports = [{
	pattern: 'role:convospot-api,cmd:list_conversations',
	action: (msg, cb) => {
		Conversation
			.find({
				client: msg.client,
				bot: msg.bot,
				status: msg.status
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
},{
	pattern: 'role:convospot-api,cmd:list_bots',
	action: (msg, cb) => {
		Bot
			.find({
				client: msg.client
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
},{
	pattern: 'role:convospot-api,cmd:list_messages',
	action: (msg, cb) => {
		Message
			.find({
				client: msg.client,
				conversation: msg.conversation
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
},{
	pattern: 'role:convospot-api,cmd:add_message',
	action: (msg, cb) => {
		Message
			.create({
				text: msg.text,
				source: 'helper',
				conversation: msg.conversation
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
}];