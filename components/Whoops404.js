var React = require('react');
var Link = require('react-router').Link;

var Whoops404 = React.createClass({
   render() {
       return (
       	<div>
           <h1>Whoops404</h1>
           <Link to="/">Home</Link>
           </div>
       )
   } 
});

module.exports = Whoops404;