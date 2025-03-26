//const Register = require('../src/Register');
const handler = {};

handler.registerHandler = (requestProperties, callback) => {
    console.log(requestProperties);
   callback(200, {
    message : 'this is register',
   });
};

module.exports = handler;