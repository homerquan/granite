/*
* @Author: Homer
* @Date:   2017-12-29 17:34:32
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-29 17:34:59
*/

module.exports = {
  disableAuth: true,
  seeds: {
  	disable: false
  },
  port: 8101,
  log: {
    level: 'verbose'
  },
  models: {
    connection: ['mongo']
  },
  amqpConn:  'amqp://guest:guest@localhost:5672/seneca'
};
