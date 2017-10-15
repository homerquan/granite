"use strict";
const config = require('../../config/services/token');

const base64url = require('base64url');
const crypto = require('crypto');

module.exports = {
    gen: (size = config.services.token.defaultSize) => {
        return base64url(crypto.randomBytes(size));
    }
}
