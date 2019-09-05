"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _schema = _interopRequireDefault(require("../schema"));

// import 'newrelic';
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: function origin(_origin, callback) {
    console.log(_origin);
    var whitelist = /\.now\.sh\//.test(_origin) || /localhost/.test(_origin);
    console.log('whitelist', whitelist);
    callback(null); // callback(whitelist ? null : 'Bad Request', whitelist);
  }
}));
app.set('port', process.env.PORT || 5000); // Requests to /graphql redirect to /

app.all('/graphql', function (req, res) {
  return res.redirect('/');
});
app.use('/', (0, _expressGraphql["default"])(function () {
  return {
    schema: _schema["default"],
    graphiql: true
  };
})); // Listen for incoming HTTP requests

var listener = app.listen(app.get('port'), function () {
  var host = listener.address().address;

  if (host === '::') {
    host = 'localhost';
  }

  var port = app.get('port');
  console.log('Listening at http://%s%s', host, port === 80 ? '' : ":".concat(port));
});