/*
* @Author: Homer
* @Date:   2017-12-29 17:34:32
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-05 00:16:51
*/

module.exports = {
  disableAuth: true,
  seeds: {
  	disable: false
  },
  port: 8101,
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
