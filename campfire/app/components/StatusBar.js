// status bar is 88px portrait, 64px landscape

var React = require('react-native');

var {
	View,
	StyleSheet,
	Text
} = React;

var styles = StyleSheet.create({
	statusBar: {
		paddingTop: 30,
		paddingBottom: 10,
		backgroundColor: '#FF6B35',
		flexDirection: 'row'
	},
	statusBarText: {
		color: 'white',
		alignItems: 'stretch',
		textAlign: 'center',
		flex: 1,
		fontWeight: 'bold'
	}
});

class StatusBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View
				style={styles.statusBar}>
				<Text
					style={styles.statusBarText}>
					{this.props.title}
				</Text>
			</View>
		);
	}
}

module.exports = StatusBar;