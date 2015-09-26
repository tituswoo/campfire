var React = require('react-native');
var StatusBar = require('./StatusBar');

var Firebase = require('firebase');
var GeoFire = require('geofire');

var firebase = new Firebase('https://campfire2.firebaseIO.com/'); 
var geofire = new GeoFire(firebase);

var {
	View,
	Text,
	StyleSheet,
	MapView,
	TextInput,
	TouchableHighlight
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
		marginBottom: 10
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
			title: '',
			whereAmI: {
		        latitude: 1,
		        longitude: 1,
		        latitudeDelta: 0.006,
		        longitudeDelta: 0.006
		      },
		      annotations: []
		};
	}

	_getGeoLocation() {
		navigator.geolocation.getCurrentPosition((initialPosition) => {
	      console.info('initial position:', initialPosition);

	      var lat = initialPosition.coords.latitude;
	      var long = initialPosition.coords.longitude;

	      this.setState({
	      	description: 'What\'s happening?',
	      	whereAmI: {
	      		latitude: lat,
	      		longitude: long,
	      		latitudeDelta: 0.006,
	      		longitudeDelta: 0.006
	      	},
	      	annotations: [{
	      		latitude: lat,
	      		longitude: long,
	      		animationDrop: true
	      	}]
	      });

	      this.positionWatcher = navigator.geolocation.watchPosition((lastPosition) => {
	      	this.setState({
		      	whereAmI: {
		      		latitude: lastPosition.coords.latitude,
		      		longitude: lastPosition.coords.longitude,
		      		latitudeDelta: 0.006,
		      		longitudeDelta: 0.006
		      	},
		      	annotations: [{
		      		latitude: lastPosition.coords.latitude,
		      		longitude: lastPosition.coords.longitude,
		      		animationDrop: true
		      	}]
		      });
	      });

	      geofire.set('some key' + Math.floor(Math.random()), [lat, long]).then(function () {
	        console.log('test');
	      }, function (error) {
	        console.warn('error');
	      });
	    });
	}

	componentDidMount() {
		this._getGeoLocation();
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.positionWatcher);
	}

	_onSetUpCamp() {
		console.info('setting up camp');		
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar title={this.state.title} />
				<MapView
					region={this.state.whereAmI}
					annotations={this.state.annotations}
					style={styles.map}>
				</MapView>
				<TextInput
					value={this.state.description}
					style={styles.textInput}
					clearTextOnFocus={true}
					onChangeText={(t)=>this.setState({description: t})}></TextInput>
				<TouchableHighlight onPress={this._onSetUpCamp} style={styles.button}>
					<Text style={styles.buttonText}>Set up camp</Text>
				</TouchableHighlight>
			</View>			
		);
	}
};

module.exports = CampfiresView;