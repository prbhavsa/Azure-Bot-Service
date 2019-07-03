'use strict';

var request = require('request');
var request_as_promised = require('request-promise');

var host = "https://ottawabot.azurewebsites.net/qnamaker";

var endpoint_key = "e3baa3b7-7583-4ff8-b8ac-05c3e82662e4";


var route = "/knowledgebases/e9186341-abca-4b15-ac0a-978e1e9f40c7/generateAnswer";

var answers;

async function qna(que) {
    try{
        var options = {
            uri: host + route,
            method: 'POST',
            headers: {
                'Authorization': "EndpointKey " + endpoint_key
            },
            json: true,
            body: que
        };

        var response = await request_as_promised.post(options);
        //console.log(response);

        return response;

    } catch (err){
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.error);
    }
}

module.exports.qna = qna;


//var que = {'question': 'office','top': 3};
//qna(que);