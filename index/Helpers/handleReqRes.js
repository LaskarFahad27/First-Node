const url = require('url');
const {StringDecoder} = require("string_decoder");
const routes = require('../routes');
const {notFoundHandler} = require('../notFoundHandler');

const handler = {};

handler.handleReqRes = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
    }
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    chosenHandler(requestProperties, (statusCode, payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);
    })

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', ()=>{
        realData += decoder.end();
        console.log(realData);
        res.end('Hello World');
    });
};

module.exports = handler;