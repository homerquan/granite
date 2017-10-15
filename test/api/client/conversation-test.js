'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('http://localhost:8001'); // supertest init;
var expect = chai.expect;

describe('/conversation', function() {
  describe('get', function() {
    it('should respond with 200 Success', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "caller": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "email": {
                "type": "string"
              }
            }
          },
          "bot": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "version": {
                "type": "string"
              },
              "knowledge_base": {
                "type": "string"
              }
            }
          },
          "context": {
            "type": "object",
            "properties": {
              "ip": {
                "type": "string"
              }
            }
          },
          "welcome": {
            "type": "number"
          },
          "mode": {
            "type": "string"
          },
          "status": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.get('/v2/conversation')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(validator.validate(res.body.data, schema)).to.be.true;
        done();
      });
    });

    it('should respond with default Error', function(done) {
      /*eslint-disable*/
      var schema = {
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.get('/v2/conversation')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

  });

});
