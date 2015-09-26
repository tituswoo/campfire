/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//var campfire = require('campfire');



var CampfiresView = require('./app/components/CampfiresView');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  MapView,
  TextInput,
  Navigator,
  TabBarIOS,
  StatusBarIOS
} = React;

class campfire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'newCamp'
    };
  }

  changeTab(tabName) {
    StatusBarIOS.setStyle(tabName === 'faceMash' ? 1 : 0);
    this.setState({
      selectedTab: tabName
    });
  };

  _renderScene(route, navigator) {
    if (route.name === 'CampfiresView') {
      return <CampfiresView navigator={navigator} />
    }
  };

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'CampfiresView',
          index: 0
        }}
        renderScene={this._renderScene}>
      </Navigator>
    );
  };
};

/*var campfire = React.createClass({
  render: function() {
    if (!this.state.campfires) {
      return this.renderLoadingView();
    }

    return (
      <Navigator
        initialRoute={{name: 'Campfires', index: 0}}
        renderScene={(route, navigator) => {
        }}>

      </Navigator>
      
    );
  },
  getInitialState: function () {
    return {
      campfires: null,
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
});*/

AppRegistry.registerComponent('campfire', () => campfire);
