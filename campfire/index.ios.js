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
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  MapView,
  TextInput
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
          {this.state.debugPosition.lat}
          {this.state.debugPosition.long}
        </Text>
        <Text style={styles.instructions}>
          {this.state.awesomeText}
        </Text>

        <Text style={styles.instructions}>{this.state.helloText}</Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 20, padding: 10}}
            name="textinput"
            onChange={this.handleTextInputChange}
            onSubmitEditing={this.onSubmitEditing}></TextInput>
        <TouchableHighlight style={styles.button} onPress={this._getLocation}>
          <Text>Set up camp</Text>
        </TouchableHighlight>
      </View>
    );
  },
  getInitialState: function () {
    return {
      campfires: null,
      text: "",
      awesomeText: '',
      helloText: 'I am sad, nobody clicked me.',
      debugPosition: {
        lat: '',
        long: ''
      },
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
  inputText: "",
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
      helloText: 'YOU CLICKED ME! I am happy.',
      awesomeText: this.inputText
    });
    var text = this.inputText;
    navigator.geolocation.getCurrentPosition((initialPosition) => {
      console.info('initial position:', initialPosition);
      var lat = initialPosition.coords.latitude;
      var long = initialPosition.coords.longitude;
      geofire.set('some key' + Math.floor(Math.random()), [lat, long]).then(function () {
        console.log('test');
        console.log({long: long, lat: lat});
        console.log({eventDesc: text, eventLoc: {long: long, lat: lat}});
      }, function (error) {
        console.warn('error');
      });
    });
  },
  handleTextInputChange: function (event) {
    this.inputText = event.nativeEvent.text;
  },
  onSubmitEditing: function (event) {
    this._getLocation();
  },
  _updateText: function (text) {
    this.setState({awesomeText: text});
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
    alignItems: 'stretch',
    margin: 10,
    borderWidth: 1,
    borderColor: '#1D1F21'
  },
  textInput: {height: 40, width: 300, borderWidth: 1, borderColor: 'black'}
});

AppRegistry.registerComponent('campfire', () => campfire);
