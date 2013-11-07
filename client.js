module.exports = function(){
  var os = require("os")
    , express = require('express')
    , app = express()
    , event = app.event = new (require('events').EventEmitter)
    , config = app.config = require('./config.js')(app)
    ;

    // placeholder objects. thse must exist here so that function callbacks can reference them
    app.db = {}; // database items to request from server
    app.serialReadBuffer = [];

  // tools and utilities
    app.utils = require('./utils.js')(app);
    app.gs = require('./service-groundstation.js')(app);
    app.port = require('./service-port.js')(app);
    app.socket = require('./service-socket.js')(app);
    
    
  app.utils.log('Vizon Ground Station starting on ' + os.hostname());
  app.utils.log('Starting in ' + app.utils.colors.info + app.config.env + app.utils.colors.reset+ ' environment')
  console.log();

  if(app.config.dev || false) app.use(express.logger('dev'));
  app.use(express.bodyParser());
  require('./service-routes.js')(app);
  
  app.http = app.listen(8081, function() {
    app.utils.log(app.utils.colors.info + 'INF' + app.utils.colors.reset + ' Listening on ' + app.utils.colors.warn + 'http:' + app.http.address().port + app.utils.colors.reset);
  });

}();