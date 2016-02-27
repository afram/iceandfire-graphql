
require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});

var chai = require('chai');

var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

process.on('unhandledRejection', function (error) {
  console.error('Unhandled Promise Rejection:');
  console.error(error && error.stack || error);
});

process.env.NODE_ENV = 'test';
