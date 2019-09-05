// import 'newrelic';
import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import gotSchema from '../schema';

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      const whitelist = /\.now\.sh\//.test(origin) || /localhost/.test(origin);
      console.log('whitelist', whitelist);
      callback(null);
      // callback(whitelist ? null : 'Bad Request', whitelist);
    },
  })
);
app.set('port', process.env.PORT || 5000);

// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));

app.use(
  '/',
  graphqlHTTP(() => ({
    schema: gotSchema,
    graphiql: true,
  }))
);

// Listen for incoming HTTP requests
const listener = app.listen(app.get('port'), () => {
  let host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  const port = app.get('port');
  console.log('Listening at http://%s%s', host, port === 80 ? '' : `:${port}`);
});
