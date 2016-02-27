
require('babel/register')({
  optional: ['runtime', 'es7.asyncFunctions']
});

var swapiSchema = require('../src/schema');
var printSchema = require('graphql/utilities').printSchema;

try {
  var output = printSchema(swapiSchema);
  console.log(output);
} catch (error) {
  console.error(error);
  console.error(error.stack);
};
