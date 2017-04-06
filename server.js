const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
var cors = require('cors')

app.use(allowCrossDomain);
// app.use(cors())

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var port = process.env.PORT || 4000;

const schema = require("./schema.js").Schema;

app.use('/graphql', graphqlHTTP((req) => ({
  schema: schema,
  pretty: true,
  graphiql: false,
  context: req.context
})));

app.listen(port, () => console.log('Our app is running on http://localhost:' + port));