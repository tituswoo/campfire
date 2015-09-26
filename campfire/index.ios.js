/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//var campfire = require('campfire');

var Firebase = require('firebase');
var GeoFire = require('geofire');

var firebase = new Firebase('https://campfire2.firebaseIO.com/'); 
var geofire = new GeoFire(firebase);

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  MapView
} = React;

var campfire = React.createClass({
  render: function() {
    if (!this.state.campfires) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Campfire!
        </Text>

        <MapView style={styles.map} annotations={this.state.annotations} region={this.state.mapRegion}>

        </MapView>

        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text>{this.state.helloText}</Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableHighlight style={styles.button} onPress={this._getLocation}>
          <Text>Get location</Text>
        </TouchableHighlight>
      </View>
    );
  },
  getInitialState: function () {
    return {
      campfires: null,
      helloText: 'I am sad, nobody clicked me.',
      mapRegion: {
        latitude: 33.7766249,
        longitude: -84.3963596,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006
      },
      annotations: [
          {
            latitude: 33.7766249,
            longitude: -84.3963596,
            animationDrop: true,
            title: 'Hello'
          }
      ]
    }
  },
  renderLoadingView: function () {
    setInterval(() => {
    this.setState({
        campfires: []
      });
    }, 1000);

    return (
      <View style={styles.container}>
        <Text>Loading campfires...</Text>
      </View>
    );
  },
  _getLocation: function () {
    console.log('GETTING LOCATION');
    this.setState({
      helloText: 'YOU CLICKED ME! I am happy.'
    });
    navigator.geolocation.getCurrentPosition((initialPosition) => {
      console.info('initial position:', initialPosition);
      var lat = initialPosition.coords.latitude;
      var long = initialPosition.coords.longitude;
      geofire.set('some key' + Math.floor(Math.random()), [lat, long]).then(function () {
        console.log('test');
      }, function (error) {
        console.warn('error');
      });
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4FBDF2',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3
  },
  map: {
    height: 150,
    width: 300,
    margin: 10,
    borderWidth: 1,
    borderColor: '#1D1F21'
  }
});

AppRegistry.registerComponent('campfire', () => campfire);
