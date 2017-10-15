// Test ms
const seneca = require('seneca')();

const config = require('../config/env');

var ms= seneca.use('seneca-amqp-transport');

ms.client({
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-socket'
});

ms.client({
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-console'
});

ms.client({
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-engine'
});

ms.client({
        type: 'amqp',
        url: config.amqpConn,
        pin: 'role:convospot-knowledge'
});

//seneca.act({role: 'convospot-engine', cmd: 'ask', left: 1, right: 2}, console.log);
//seneca.act({role: 'convospot-knowledge', cmd: 'ask', left: 1, right: 2}, console.log);
seneca.act({role: 'convospot-console', cmd: 'create_message', left: 1, right: 2}, console.log);