var http = require('http'),
    fs = require('fs'),
    querystring = require('querystring');

function request(requestObj) {
    var host = requestObj.host || null,
        username = requestObj.username || null,
        password = requestObj.password || null,
        apiKey = requestObj.apiKey || null,
        sessionId = requestObj.sessionId || null;



    function performRequest(endpoint, method, data, success) {
        if(!(endpoint && method && data && success)){
            console.log('Error: not enough information for a request to happen');
            return '';
        }
        var dataString = JSON.stringify(data);
        var headers = {};

        if (method == 'GET') {
            endpoint += '?' + querystring.stringify(data);
        }
        else {
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            };
        }
        var options = {
            host: host,
            path: endpoint,
            method: method,
            headers: headers
        };

        var req = https.request(options, function(res) {
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                console.log(responseString);
                var responseObject = JSON.parse(responseString);
                success(responseObject);
            });
        });

        req.write(dataString);
        req.end();
    }

    return {
        performRequest: performRequest,
        instance: this
    }
}