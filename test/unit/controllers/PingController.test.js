"use strict";

const assert = require('chai').assert;

describe('controllers:PingController', () => {
  it('Should return message that HTTP server is working', done => {
    sails.request({
      method: 'GET',
      url: '/v2/ping'
    }, (error, res, body) => {
      if (error) return done(error);

      assert.equal(res.statusCode, 200,  'HTTP server is working');
      
      done();
    });
  });
});
