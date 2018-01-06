/*
* @Author: Homer
* @Date:   2018-01-03 22:01:31
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-06 00:34:33
*/

const ListBotsHandler = require('./handlers/ListBotsHandler')
const ListVisitorsHandler = require('./handlers/ListVisitorsHandler')
const ListConversationsHandler = require('./handlers/ListConversationsHandler')
const GetKnowledgeHandler = require('./handlers/GetKnowledgeHandler')

const getCode = (code) => {
	return require('../../config/constants').get('codes',code);
}

//TODO: for large data using mongo stream

module.exports = (request,cb) => {
	if(request.typeCode == getCode('LIST_BOTS')) {
		ListBotsHandler(request,cb)
	} else if (request.typeCode == getCode('LIST_VISITORS')) {
		ListVisitorsHandler(request,cb)
	} else if (request.typeCode == getCode('LIST_CONVERSATIONS')) {
		ListConversationsHandler(request,cb)
	} else if (request.typeCode == getCode('GET_KNOWLEDGE')) {
		GetKnowledgeHandler(request,cb)
	} 
}