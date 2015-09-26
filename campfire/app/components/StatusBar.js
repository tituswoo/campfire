// status bar is 88px portrait, 64px landscape

var React = require('react-native');

var {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	StyleSheet
} = React;

var styles = StyleSheet.create({
	statusBar: {
		paddingTop: 30,
		height: 60,
		backgroundColor: '#FF6B35',
		position: 'relative'
	},
	leftButton: {
		position: 'absolute',
		left: 6
	},
	rightButton: {
		position: 'absolute',
		right: 6
	},
	statusBarTitleText: {
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'white',
	},
	whiteText: {
		color: 'white'
	}
});

class StatusBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.statusBar}>					
				<Text style={styles.statusBarTitleText}>
					{this.props.title}
				</Text>	
				<TouchableOpacity style={styles.leftButton} onPress={this.props.goBack}>
					<Text style={styles.whiteText}>{this.props.goBackwardText}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.rightButton} onPress={this.props.goForward}>
					<Text style={styles.whiteText}>{this.props.goForwardText}</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

module.exports = StatusBar;