var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
};

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
        } else if(this.id === speaker.id) {
            console.log('%s is left. %s is over', speaker.name, title);
            speaker = {};
            title = 'Untitled Presentation';
            io.sockets.emit('end', {title: title, speaker: ''})
        }

        socket.disconnect();
        console.log('disconnected %s sockets remaining', connections.length);
    });
    
    socket.emit('welcome', {
       title: title,
       audience: audience,
       speaker: speaker.name,
       questions: questions,
       currentQuestion: currentQuestion,
       results: results
    });
    socket.on("join", function(payload) {
        var member = {
            id: this.id,
            name: payload.name,
            type: 'audience'
        };
        this.emit('joined', member);
        audience.push(member);
        io.sockets.emit('audience', audience);
        console.log(payload); 
    });
    socket.on('start', function(payload) {
        speaker.name = payload.name;
        speaker.id = this.id;
        title = payload.title;
        speaker.type = 'speaker';
        this.emit('joined', speaker);
        io.sockets.emit('start', {
            title: title,
            speaker: speaker.name
        })
        console.log('Presentation started. Presenter: %s', speaker.name);
    });
    socket.on('ask', function(question) {
        currentQuestion = question;
        results = {a: 0, b: 0, c: 0, d: 0};
        io.sockets.emit('ask', currentQuestion);
        console.log('Question asked : %s', currentQuestion);
    });
    socket.on('answer', function(payload) {
        results[payload.choice]++;
        console.log('Answer is %s - %j', payload.choice, results);
        io.sockets.emit('results', results);
    });
    connections.push(socket);
    console.log('connected %s sockets connected', connections.length);
});
console.log('server running... :3000');