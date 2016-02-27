
var stream = require('stream');

function streamString(str) {
  var didStream;
  var readStream = new stream.Readable();
  readStream._read = function() {
    this.push(didStream ? null : str);
    didStream = true;
  }
  return readStream;
}

module.exports = function(bundle) {
  bundle._options.insertGlobalVars = {
    process: function() {
      return 'process';
    },
    'process.env': function() {
      return '{}';
    },
    setImmediate: function() {
      return 'process.nextTick';
    },
    setTimeout: function() {
      return 'process.nextTick';
    }
  };
  return bundle
    .external('buffer')
    .external('crypto')
    .external('events')
    .external('express')
    .external('stream')
    .external('moment')
    .external('process')
    .external('querystring')
    .external('parse-express-https-redirect')
    .external('parse-express-cookie-session')
    .require(
      streamString('module.exports = { Parse: Parse };'),
      { file: 'parse', expose: 'parse' });
};
