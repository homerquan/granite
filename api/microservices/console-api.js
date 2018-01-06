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
	pattern: 'role:convospot-api,cmd:create_message',
	action: (msg, cb) => {
		Message
			.create({
				text: msg.text,
				source: msg.source,
				conversation: msg.conversation,
				type : msg.type
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
},{
	pattern: 'role:convospot-api,cmd:create_bot',
	action: (msg, cb) => {
		Bot
			.create({
				client: msg.client,
				name: msg.name,
				host: msg.url
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
},{
	pattern: 'role:convospot-api,cmd:get_knowledge',
	action: (msg, cb) => {
		Knowledge
			.findOne({
				client: msg.client,
				bot: msg.bot
			})
			.then(item => {
				cb(null, item);
			})
			.catch(cb);
	}
},{
	pattern: 'role:convospot-api,cmd:update_knowledge',
	action: (msg, cb) => {
		Knowledge
			.update({
				client: msg.client,
				bot: msg.bot
			},{
				raw: msg.raw
			})
			.then(items => {
				cb(null, items);
			})
			.catch(cb);
	}
}];