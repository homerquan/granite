"use strict";

/**
 * Development environment settings
 * @description :: This section overrides all other config values ONLY in development environment
 */

module.exports = {
  disableAuth: true,
  seeds: {
  	disable: false
  },
  port: 8001,
  log: {
    level: 'verbose'
  },
  models: {
    connection: ['mongo']
  },
  amqpConn:  'amqp://guest:guest@localhost:5672/seneca'
};
