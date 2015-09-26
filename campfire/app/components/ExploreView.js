'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var GeoFire = require('geofire');
var StatusBar = require('./StatusBar');
var firebase = new Firebase('https://campfire2.firebaseIO.com/'); 
var geo = new Firebase('https://campfire2.firebaseIO.com/geofires');
var camp = new Firebase('https://campfire2.firebaseIO.com/campfires');
var geobase = new GeoFire(geo);

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

geobase.get("ecake8215").then(function(location) {
  if (location === null) {
    console.log("Provided key is not in GeoFire");
  }
  else {
    console.log("Provided key has a location of " + location);
  }
}, function(error) {
  console.log("Error: " + error);
});



camp.on("child_added", function(snapshot, prevChildKey) {
  var newPost = snapshot.val();
  console.log("Key: " + newPost.key);
  console.log("Description: " + newPost.description);
  console.log("Visitors: " + newPost.visitors);
  console.log("Popularity: " + newPost.popularity);
  console.log("Comments: " + newPost.comments);
});
module.exports = ExploreView;