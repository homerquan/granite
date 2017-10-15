"use strict";

/**
 * Production environment settings
 * @description :: This section overrides all other config values ONLY in production environment
 */

module.exports = {
  port: 80,
  seeds: {
  	disable: true
  },
  log: {
    level: 'info'
  },
  models: {
    connection: ['mongo']
  }
};
