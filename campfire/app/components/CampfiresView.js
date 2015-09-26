var React = require('react-native');
var StatusBar = require('./StatusBar');

var Firebase = require('firebase');
var GeoFire = require('geofire');

var firebase = new Firebase('https://campfire2.firebaseIO.com/'); 
var geo = new Firebase('https://campfire2.firebaseIO.com/geofires');
var camp = new Firebase('https://campfire2.firebaseIO.com/campfires');
var geobase = new GeoFire(geo);

var {
	View,
	Text,
	StyleSheet,
	MapView,
	TextInput,
	TouchableOpacity
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#fff'
	},
	map: {
		alignItems: 'stretch',
		height: 250,
		marginBottom: 10,
	},
	textInput: {
		height: 40,
		alignItems: 'stretch',
		padding: 5,
		fontSize: 25,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#D4D4D4',
		margin: 10,
		marginTop: 0
	},
	button: {
		padding: 10,
		borderColor: '#FF6B35',
		borderWidth: 2,
		borderRadius: 2,
		margin: 10,
		marginTop: 0
	},
	buttonText: {
		color: '#FF6B35',
		textAlign: 'center',
		fontWeight: 'bold'
	}
});

class CampfiresView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: 'What\'s going on?'
		};
	}

	_onSetUpCamp() {
		console.log('SET UP CAMP!');
		var myKey = this.state.description;
		myKey = myKey.replace(/[^A-Z0-9]+/ig, "");
		myKey = myKey + "" + Math.floor((Math.random() * 10000) + 1);
		myKey = myKey.substr(myKey.length - 9);

	      geobase.set(myKey, [this.props.myLocation.region.latitude, this.props.myLocation.region.longitude]).then(function () {
	        console.log('test');
	      }, function (error) {
	        console.warn('error');
	      });
      	camp.push({key : myKey, description : this.state.description, visitors : 1, comments: ["This is my favorite place of all time!"], popularity: 1});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar title="Campfires"></StatusBar>				
				<MapView
					region={this.props.myLocation.region}
					annotations={this.props.myLocation.annotations}
					style={styles.map}>
				</MapView>
				<TextInput
					placeholder={this.state.description}
					onChangeText={(t) => { this.setState({description: t})}}
					style={styles.textInput}>
				</TextInput>
				<TouchableOpacity
					onPress={this._onSetUpCamp.bind(this)}
					style={styles.button}>
					<Text style={styles.buttonText}>Set up camp</Text>
				</TouchableOpacity>
			</View>			
		);
	}
};

// Get a reference to our posts
var geoQuery = geobase.query({
  center: [37.3, -122.0],
  radius: .000005
});
console.log(geoQuery);

module.exports = CampfiresView;