"use strict";

/**
 * Configuration file where you can store error codes for responses
 *
 * It's just a storage where you can define your custom API errors and their description.
 * You can call then in your action res.ok(data, sails.config.errors.USER_NOT_FOUND);
 */

module.exports = {
  errors: {
    BAD_REQUEST: {
      code: 'E_BAD_REQUEST',
      message: 'The request cannot be fulfilled due to bad syntax',
      status: 400
    },

    CREATED: {
      code: 'CREATED',
      message: 'The request has been fulfilled and resulted in a new resource being created',
      status: 201
    },

    FORBIDDEN: {
      code: 'E_FORBIDDEN',
      message: 'User not authorized to perform the operation',
      status: 403
    },

    NOT_FOUND: {
      code: 'E_NOT_FOUND',
      message: 'The requested resource could not be found but may be available again in the future',
      status: 404
    },

    OK: {
      code: 'OK',
      message: 'Operation is successfully executed',
      status: 200
    },

    SERVER_ERROR: {
      code: 'E_INTERNAL_SERVER_ERROR',
      message: 'Something bad happened on the server',
      status: 500
    },

    UNAUTHORIZED: {
      code: 'E_UNAUTHORIZED',
      message: 'Missing or invalid authentication token',
      status: 401
    },

    USER_NOT_FOUND: {
      code: 'E_USER_NOT_FOUND',
      message: 'User with specified credentials is not found',
      status: 401
    },

    BOT_NOT_FOUND: {
      code: 'E_BOT_NOT_FOUND',
      message: 'BOT with specified id is not found',
      status: 401
    },

    BOT_TOKEN_NOT_COREECT: {
      code: 'E_BOT_TOKEN_NOT_COREECT',
      message: 'Bot with specified id and token is not found',
      status: 406
    },
    
    BOT_HOST_NOT_MATCH: {
      code: 'E_BOT_HOST_NOT_MATCH',
      message: 'Bot is not allowed for this host',
      status: 406
    },

    CONVO_NOT_FOUND: {
      code: 'E_CONVO_NOT_FOUND',
      message: 'Convo with specified id is not found',
      status: 401
    },

    CONVO_TOKEN_NOT_COREECT: {
      code: 'E_CONVO_TOKEN_NOT_COREECT',
      message: 'Convo with specified id and token is not found',
      status: 406
    },

    JWT_NOT_VALID: {
      code: 'E_JWT_NOT_VALID',
      message: 'JWT Token is not valid',
      status: 406
    }
  }
};
