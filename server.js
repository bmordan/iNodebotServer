var server = require('express')();
var http = require('http').Server(server);
var expressLayouts = require('express-ejs-layouts');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

server.set('view engine', 'ejs');
server.set('views',__dirname + '/views');
server.use(expressLayouts);
server.use(require('express').static(__dirname + '/public'));

server.get('/', function(req, res){
  res.render('index', {layout: 'layout'})
});

server.get('/drive', function(req, res){
  res.render('drive', {layout: 'layout'});
});

http.listen(port, function(){
  console.log('iNodebotServer running on '+port)
});

io.on('connection', function(connection){
  connection.on('ready', function(data){
    console.log('THREE LAWS SAFE iNodebot connected');
  });
  connection.on('drive', function(data){
    console.log(data)
  });
});