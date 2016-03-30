var React = require('react');
var Link = require('react-router').Link;

var ReactDOM = require('react-dom');

var Join = React.createClass({

	join() {
		var memberName = ReactDOM.findDOMNode(this.refs.name).value;
		this.props.emit('join', {name: memberName});
	},

   	render() {
       return (
    	    <form action="javascript:void(0);" onSubmit={this.join}>
           		<label>Name</label>
           		<input 	ref="name"
           				className="form-control"
           				placeholder="enter full name ..."
           				required />
           		<button className="btn btn-primary">Join</button>

              <Link to="/speaker">Join as speaker</Link>
           	</form>
       )
   } 
});

module.exports = Join;