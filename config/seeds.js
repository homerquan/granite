/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

module.exports.seeds = {
    user: {
        data: [{
            "username": "demo",
            "email": "demo@test.com",
            "password": "123456"
        }],
        overwrite: true
    },
    bot: {
        data: [{
            "id":"5f9efca2-c423-49d1-84f8-72981a07d430",
            "token":"Z5lHSSvEnVdPZUhk",
        	"name": "demo bot",
            "host": "localhost",
            "welcome": "hello convospot",
            "mode": "auto"
        }],
        overwrite: true
    },
    conversation: {
        data: [],
        overwrite: true
    },
    message :{
        data: [],
        overwrite: true
    }
}
