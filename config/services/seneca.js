const config = require('../env');

module.exports = {
    services: {
        seneca: {
            server: {
                type: 'amqp',
                url: config.amqpConn,
                pin: 'role:convospot-api'
            },
            clients: [{
                type: 'amqp',
                url: config.amqpConn,
                pin: 'role:convospot-socket'
            }, {
                type: 'amqp',
                url: config.amqpConn,
                pin: 'role:convospot-engine'
            },{
                type: 'amqp',
                url: config.amqpConn,
                pin: 'role:convospot-console-api'
            }]
        }
    }
}