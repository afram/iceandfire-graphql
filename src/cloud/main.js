import express from 'express';
import graphqlHTTP from 'express-graphql';
import gotSchema from '../schema';


const app = express();
app.set('port', (process.env.PORT || 5000));

// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));

app.use('/', graphqlHTTP(() => ({
  schema: gotSchema,
  graphiql: true
})));

// Listen for incoming HTTP requests
const listener = app.listen(app.get('port'), () => {
  var host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  var port = app.get('port');
  console.log('Listening at http://%s%s', host, port === 80 ? '' : ':' + port);
});
