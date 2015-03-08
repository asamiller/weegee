var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var Finger = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			finger: {} 
		};
	},

	getDefaultProps: function() {
		return {
			id: 0
		};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase('https://weegee.firebaseio.com/fingers/' + this.props.id);
		this.bindAsObject(firebaseRef, 'finger');
	},

	render: function() {
		var finger = this.state.finger || {};

		var position = 'translate3d(' + (finger.x || 0) + 'px, ' + (finger.y || 0) + 'px, 0)';

		var style = {
			transform       : position,
			msTransform     : position,
			MozTransform    : position,
			WebkitTransform : position,
			OTransform      : position
		};

		return (
			<div className='finger' style={style} />
		);
	}

});

module.exports = Finger;