'use strict';

var React = require('react-native');
var StatusBar = require('./StatusBar');

var {
	View,
	Text
} = React;

class ExploreView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<StatusBar title="Explore" />
				
			</View>
		);
	}
};

module.exports = ExploreView;