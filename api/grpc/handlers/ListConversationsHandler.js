/*
* @Author: Homer
* @Date:   2018-01-04 00:43:43
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-04 00:43:53
*/
module.exports = (request,cb) => {
	Conversations.find()
		.then(items => {
			cb(null, {data:JSON.stringify(items)});
		})
		.catch(cb);
};
