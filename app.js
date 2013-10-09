var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

app.use(express.logger('dev'));
app.set('port', process.env.PORT || 3000);
[ 'app', 'styles', 'spec' ].forEach(function (id) {
  app.use('/' + id, express.static(path.join(__dirname, id)));
});
app.use(function (req, res) {
  res.sendfile(path.join(__dirname, 'index.html'));
});
app.use(express.compress());
app.use(express.errorHandler());

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

exports = module.exports = server;

exports.use = function() {
  app.use.apply(app, arguments);
};
