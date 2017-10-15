"use strict";

/**
 * Winston Logger Configuration
 * For detailed information take a look here - https://github.com/Kikobeats/sails-hook-winston
 */

const path = require('path');
const pkgJSON = require(path.resolve('package.json'));
 
module.exports.log = {
 
  // This options are for Console transport that is used by default 
  // E.g., "silent", "error", "warn", "http", "info", "verbose", "silly"
  level: 'info', 
  timestamp: true, // if you want to output the timestamp in the console transport 
 
  // Transports 
  // more information: https://github.com/winstonjs/winston/blob/master/docs/transports.md 
  transports: [
    {
      module: require('winston-daily-rotate-file'),
      config: {
        dirname: path.resolve('var/logs'),
        datePattern: '.yyyy-MM-dd.log',
        filename: pkgJSON.name,
        prettyPrint: true,
        timestamp: true,
        level: 'silly'
      }
    }
  ]
};
