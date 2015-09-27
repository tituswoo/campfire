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
	TouchableOpacity,
	MapView,
	StyleSheet,
	ListView,
	ScrollView,
	Image
} = React;

var styles = StyleSheet.create({
	map: {
		alignItems: 'stretch',
		height: 150,
		marginBottom: 10,
		flex: 1
	},
	listEvent: {
		margin: 15,
		marginTop: 5,
		marginBottom: 5,
		borderRadius: 0,
		borderWidth: 1,
		padding: 10,
		borderColor: '#FF6B35',
		flexDirection: 'row'
	},
	listEventText: {
		color: '#FF6B35',
	},
	scrollContainer: {
		flex: 1
	},
	chevronRight: {
		width: 20,
		height: 20

	}

});

class ExploreView extends React.Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var arrList = ['Free pizza at Skiles!!', 'Join Capture the Flag at 4pm', 
		'Guitarist behind Student Center', 'Pet puppies at the library today!']	
		this.state = {
			dataSource: ds.cloneWithRows(arrList),
			comment: '',
			arrList: arrList
		};
	}

	_goBackwards() {
		console.log('WENT BACKW|ARDS');
		this.props.navigator.push({
			name: 'CampfiresView'
		});
	}

	_goForwards() {
		this.props.navigator.push({
			name: 'CampfiresView'
		});
	}

	_viewDetails() {
		console.log("DETAIL VIEW");
	}

	render() {
		return (
			<View style={{
				flex: 1
			}}>
				<StatusBar
					title="Explore"
					goForward={this._goForwards.bind(this)}
					goForwardText="Add">
				</StatusBar>
				<View style={{
					flex: 5,
					flexDirection: 'column',
					alignItems: 'stretch'
				}}>
					<MapView
						region={this.props.myLocation.region}
						annotations={this.props.myLocation.annotations}
						style={styles.map}>
					</MapView>
					<View style={{
						flex: 1
					}}>
						<ScrollView style={styles.scrollContainer}>
							<ListView
								automaticallyAdjustContentInsets={false}
								dataSource={this.state.dataSource}
		      					renderRow={(rowData) => 
		      						<View style={styles.listEvent}>
		      							<Text style={styles.listEventText}>{rowData}</Text>
		      						</View>
								}></ListView>
						</ScrollView>
					</View>
				</View>
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