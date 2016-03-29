var React = require('react');

var Display = require('./parts/Display');
var JoinSpeaker = require('./parts/JoinSpeaker');

var Speaker = React.createClass({
   render() {
       return (
           <Display if={this.props.status === 'connected'}>
           	
           </Display>
       )
   } 
});

module.exports = Speaker;