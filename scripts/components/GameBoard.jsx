var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var _ = require('lodash');

var Finger = require('./Finger.jsx');
var Puck = require('./Puck.jsx');

var GameBoard = React.createClass({
	mixins: [ReactFireMixin],

	getInitialState: function() {
		return {
			fingers: {}
		};
	},

	componentWillMount: function() {
		this.firebaseRef = new Firebase('https://weegee.firebaseio.com/fingers');
		this.bindAsObject(this.firebaseRef, 'fingers');

		this.touches = {};
	},

	render: function() {
		return (
			<div
				className='gameboard'
				onMouseDown   = {this._onPress}
				onMouseUp     = {this._onRelease}
				onMouseMove   = {this._onMove}

				onTouchStart  = {this._onTouchPress}
				onTouchEnd    = {this._onTouchRelease}
				onTouchCancel = {this._onTouchRelease}
				onTouchMove   = {this._onTouchMove} >
				
				{
					_.map(this.state.fingers, function (finger, key) {
						return (<Finger id={key} key={key} />);
					})
				}

				<Puck />
			</div>
		);
	},



	_addFinger: function (id, data) {
		var fingerRef = this.firebaseRef.push(data);
		this.touches[id] = fingerRef.key();
	},

	_removeFinger: function (id) {
		var firebaseID = this.touches[id];
		if (firebaseID) this.firebaseRef.child(firebaseID).set(null);
		delete this.touches[id];
	},

	_moveFinger: function (id, data) {
		var firebaseID = this.touches[id];
		if (firebaseID) this.firebaseRef.child(firebaseID).update(data);
	},




	// Desktop
	_onPress: function (event) {
		event.preventDefault();

		this._addFinger('mouse', {
			x: event.clientX,
			y: event.clientY
		});
	},

	_onRelease: function (event) {
		event.preventDefault();

		this._removeFinger('mouse');
	},

	_onMove: function (event) {
		event.preventDefault();

		this._moveFinger('mouse', {
			x: event.clientX,
			y: event.clientY
		});
	},






	// Mobile
	_onTouchPress: function (event) {
		event.preventDefault();
		var self = this;

		_.each(event.changedTouches, function (touch) {
			self._addFinger(touch.identifier, {
				x: touch.clientX,
				y: touch.clientY
			});
		});
	},

	_onTouchRelease: function (event) {
		event.preventDefault();
		var self = this;

		_.each(event.changedTouches, function (touch) {
			self._removeFinger(touch.identifier);
		});
	},

	_onTouchMove: function (event) {
		event.preventDefault();
		var self = this;

		_.each(event.changedTouches, function (touch) {
			self._moveFinger(touch.identifier, {
				x: touch.clientX,
				y: touch.clientY
			});
		});
	}
});

module.exports = GameBoard;