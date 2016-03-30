var React = require('react');

var ReactDOM = require('react-dom');

var JoinSpeaker = React.createClass({

  start() {
    var speakerName = ReactDOM.findDOMNode(this.refs.name).value;
    var title = ReactDOM.findDOMNode(this.refs.title).value;
    this.props.emit('start', {name: speakerName, title: title});
  },

	render() {
		return (
			 <form action="javascript:void(0);" onSubmit={this.start}>
           		<label>Name</label>
           		<input 	ref="name"
           				className="form-control"
           				placeholder="enter full name ..."
           				required />
           		<label>Title</label>
           		<input 	ref="title"
           				className="form-control"
           				placeholder="enter presentation title ..."
           				required />
           		<button className="btn btn-primary">Start</button>
           	</form>
		);
	}
});

module.exports = JoinSpeaker;
