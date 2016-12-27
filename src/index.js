const express = require('express');
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 8000;

routes(app, express);
// app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Kofile API listening on ' + port);
})

module.exports = app;