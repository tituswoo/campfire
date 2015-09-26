/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var CampfiresView = require('./app/components/CampfiresView');
var ExploreView = require('./app/components/ExploreView');

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
      selectedTab: 'newCamp',
      myLocation: {}
    };
  }

  changeTab(tabName) {
    StatusBarIOS.setStyle(tabName === 'faceMash' ? 1 : 0);
    this.setState({
      selectedTab: tabName
    });
  };

  _getMyLocation() {
    navigator.geolocation.getCurrentPosition((initPos) => {
      console.log('Init position:', initPos);

      this.setState({
        myLocation: {
          region: {
            latitude: initPos.coords.latitude,
            longitude: initPos.coords.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006
          },
          annotations: [{
            latitude: initPos.coords.latitude,
            longitude: initPos.coords.longitude,
            animationDrop: true
          }]
        }
      });
    })
  }

  componentDidMount() {
    this._getMyLocation.call(this);
  }

  _renderScene(route, navigator) {
    if (route.name === 'ExploreView') {
      return <ExploreView
        myLocation={this.state.myLocation}
        navigator={navigator} />
    }
    
    if (route.name === 'CampfiresView') {
      return <CampfiresView
        myLocation={this.state.myLocation}
        navigator={navigator} />
    }
  };

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'ExploreView',
          index: 0
        }}
        renderScene={this._renderScene.bind(this)}>
      </Navigator>
    );
  };
};

AppRegistry.registerComponent('campfire', () => campfire);
