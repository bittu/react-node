var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    
    socket.once('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1);
        var member = _.findWhere(audience, {id: this.id});
        if(member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
            console.log('Left %s (%s audience members)', member.name, audience.length);
        }
        socket.disconnect();
        console.log('disconnected %s sockets remaining', connections.length);
    });
    
    socket.emit('welcome', {
       title: title 
    });
    socket.on("join", function(payload) {
        var member = {
            id: this.id,
            name: payload.name,
            type: 'member'
        };
        this.emit('joined', member);
        audience.push(member);
        io.sockets.emit('audience', audience);
        console.log(payload); 
    });
    socket.on('start', function(payload) {
        speaker.name = payload.name;
        speaker.id = this.id;
        speaker.type = 'speaker';
        io.sockets.emit('joined', speaker);
        console.log('Presentation started. Presenter: %s', speaker.name);
    });
    connections.push(socket);
    console.log('connected %s sockets connected', connections.length);
});
console.log('server running... :3000');