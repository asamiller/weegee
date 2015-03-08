'use strict';

var React = require('react');
window.React = React;

React.initializeTouchEvents(true);

var GameBoard = require('./components/GameBoard.jsx');

React.render(<GameBoard />, document.getElementById('content'));