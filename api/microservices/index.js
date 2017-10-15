const _ = require('lodash');

var services = _.union(
	require('./socket'),
	require('./engine')
);

module.exports = function convospot(options) {
    for (var i in services) {
        this.add(services[i].pattern, services[i].action)
    };
}