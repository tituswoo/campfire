/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//var campfire = require('campfire');

var Firebase = require('firebase');
var GeoFire = require('geofire');

var f = new Firebase('https://campfire2.firebaseIO.com/'); 

var geofire = new GeoFire(f);

console.log(geofire);

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
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

        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  },
  getInitialState: function () {
    return {
      campfires: null
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
});

AppRegistry.registerComponent('campfire', () => campfire);
