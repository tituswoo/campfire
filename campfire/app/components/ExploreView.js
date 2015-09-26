'use strict';

var React = require('react-native');
var StatusBar = require('./StatusBar');

var {
	View,
	Text,
	TouchableHighlight,
	MapView,
	StyleSheet
} = React;

var styles = StyleSheet.create({
	map: {
		alignItems: 'stretch',
		height: 150,
		marginBottom: 10
	}
});

class ExploreView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_goBackwards() {
		this.props.navigator.push({
			name: 'CampfiresView'
		});
	}

	render() {
		return (
			<View>
				<StatusBar title="Explore" />
				<MapView
					region={this.props.myLocation.region}
					annotations={this.props.myLocation.annotations}
					style={styles.map}>
				</MapView>
				<TouchableHighlight onPress={this._goBackwards.bind(this)}>
					<Text>Back</Text>
				</TouchableHighlight>
			</View>
		);
	}
};

module.exports = ExploreView;