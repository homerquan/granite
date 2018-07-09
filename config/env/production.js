"use strict";

/**
 * Production environment settings
 * @description :: This section overrides all other config values ONLY in production environment
 */

module.exports = {
  port: 8801,
  disableAuth: true,
  seeds: {
    disable: true
  },
  grpc: {
    server: '0.0.0.0:8901',
    client: ''
  },
  log: {
    level: 'verbose'
  },
  models: {
    connection: ['mongo']
  },
  amqpConn:  'amqp://guest:guest@localhost:5672/seneca'
};
