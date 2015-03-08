var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var math = require('mathjs');

var Puck = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			fingers: []
		};
	},

	componentWillMount: function() {
		var firebaseRef = new Firebase('https://weegee.firebaseio.com/fingers');
		this.bindAsArray(firebaseRef, 'fingers');
	},

	render: function() {
		var xArray = this.state.fingers.map(function (finger) {
			return finger.x || 0;
		});

		var yArray = this.state.fingers.map(function (finger) {
			return finger.y || 0;
		});

		if (!xArray.length) xArray = [400];
		if (!yArray.length) yArray = [263];

		var x = math.mean(xArray) - 83;
		var y = math.mean(yArray) - 144;

		var position = 'translate3d('+x+'px, '+y+'px, 0)';

		var style = {
			transform       : position,
			msTransform     : position,
			MozTransform    : position,
			WebkitTransform : position,
			OTransform      : position
		};

		return (
			<div className='puck' style={style} />
		);
	}
});

module.exports = Puck;