const redis = require("redis");
const sub = redis.createClient();

module.exports = {
	sub:sub
};