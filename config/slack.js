/*
* @Author: Homer
* @Date:   2018-01-16 17:55:25
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-16 18:06:57
*/

var Slack = require('slack-node');

//TOOD: in prod using oauth2 
const webhookUri = "https://hooks.slack.com/services/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";

const slack = new Slack();
slack.setWebhook(webhookUri);


const send = (msg) => {
    slack.webhook({
        channel: "#test",
        username: msg.sourceId,
        text: msg.text
    }, function(err, response) {
        console.log(response);
    });
}

export { send };