// Microservices for convospot-socket

module.exports = [{
	pattern: 'role:convospot-api,cmd:create_message',
	action: (msg, cb) => {
		Message
			.create(msg)
			.then(msg => {
				cb(null, {
					data: msg
				});
			})
			.catch(cb);
	}
}];