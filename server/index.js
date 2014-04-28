var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.static(__dirname + '/../dist'));

var routes = [
  'clients', 'invoices', 'rows', 'snippets'
];

routes.forEach(function (route) {
  require('./routes/' + route).listen(app);
});

app.listen(8080);

module.exports = app;
