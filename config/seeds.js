/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

module.exports.seeds = {
    user: {
        data: [{
            "id": "c10e59d7-3b41-45fe-ac45-57f685419be6",
            "username": "demo",
            "email": "demo@test.com",
            "password": "123456"
        }],
        overwrite: true
    },
    client: {
        data: [{
            "id":"ddcd39c9-dcbc-4a26-bcf7-525d77c12d54",
            "name":"demo client",
            "owner":"c10e59d7-3b41-45fe-ac45-57f685419be6"
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
            "owner": "c10e59d7-3b41-45fe-ac45-57f685419be6",
            "client": "ddcd39c9-dcbc-4a26-bcf7-525d77c12d54"
        }],
        overwrite: true
    },
    conversation: {
        data: [{
            "id":"5b23830d-b168-4ae6-93e2-c0e1ffafdc80",
            "visitor":"a234d4ce-84c8-4e74-9d3b-a0d3f5ce3d6c",
            "bot":"5f9efca2-c423-49d1-84f8-72981a07d430",
            "client":"ddcd39c9-dcbc-4a26-bcf7-525d77c12d54"
        }],
        overwrite: true
    },
    visitor: {
        data: [{
            "id":"a234d4ce-84c8-4e74-9d3b-a0d3f5ce3d6c",
            "cid":"d9909416-6582-4849-aebd-5b2ca4983e56",
            "bot":"5f9efca2-c423-49d1-84f8-72981a07d430",
            "client":"ddcd39c9-dcbc-4a26-bcf7-525d77c12d54"
        }],
        overwrite: true
    },
    message :{
        data: [],
        overwrite: true
    }
}
