const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    //console.log(requestProperties);
    callback(404, {
        message: 'not found',
       })
};

module.exports = handler;