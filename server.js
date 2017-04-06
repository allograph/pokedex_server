const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
var cors = require('cors')

app.use(cors())

var port = process.env.PORT || 4000;

const schema = require("./schema.js").Schema;

app.use('/graphql', graphqlHTTP((req) => ({
  schema: schema,
  pretty: true,
  graphiql: false,
  context: req.context
})));

app.listen(port, () => console.log('Our app is running on http://localhost:' + port));