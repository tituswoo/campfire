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
	TouchableOpacity,
	ListView,
	ScrollView
} = React;


var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: '#fff'
	},
	topContainer: {
		backgroundColor: '#FF6B35'
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	contentContainer: {
		flex: 1,
		paddingBottom: 10,
		marginBottom: 10,
		flexDirection: 'column'
	},
	scrollContainer: {
		paddingBottom: 10,
		flexDirection: 'column'
	},
	pageTitle: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 30
	},
	map: {
		alignItems: 'stretch',
		height: 250,
		marginBottom: 10
	},
	button: {
		padding: 10,
		borderColor: '#fff',
		borderWidth: 2,
		borderRadius: 2,
		margin: 10,
		marginTop: 15,
		marginBottom: 20,
		flex: 3

	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	listItem: {
		margin: 10,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 2,
		borderWidth: 2,
		padding: 10,
		borderColor: '#FF6B35',
	},
	listItemText: {
		fontSize: 16,
		color: '#FF6B35'
	},
	addCommmentContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		margin: 10,
	},
	textComment: {
		height: 40,
		alignItems: 'stretch',
		padding: 10,
		fontSize: 20,
		borderColor: 'gray',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#D4D4D4',
		margin: 7,
		marginTop: 10,
		marginBottom: 10,
		flex: 3,

	},
	btnAddComment: {
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		borderColor: '#000',
		borderWidth: 2,
		borderRadius: 2,
		margin: 10,
	},
	btnAddCommentText: {
		fontSize: 18,
		textAlign: 'center',
	}
});

class CampfireDetailView extends React.Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var arrList = ['Comment 1', 'Comment 2', ]
		arrList.push('Titus Woo is awesome');
		this.state = {
			dataSource: ds.cloneWithRows(arrList),
			comment: '',
			arrList: arrList
		};
	}

	likePressed() {
		console.log("Like");
	}

	checkInPressed() {
		console.log("CHECK IN");
	}

	addPressed() {
		console.log("ADD COMMENT");
		var arrList = this.state.arrList;
		arrList.push(this.state.comment);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({arrList: arrList, dataSource: ds.cloneWithRows(arrList)});
		this._textinput.setNativeProps({text: ''});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar title={this.state.title} />
				<View style={styles.topContainer}>
					<Text style={styles.pageTitle}>Crock Pot</Text>
					<View style={styles.buttonsContainer}>
						<TouchableOpacity
							onPress={this.likePressed.bind(this)}
							style={styles.button}>
							<Text style={styles.buttonText}>Like</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.checkInPressed.bind(this)}
							style={styles.button}>
							<Text style={styles.buttonText}>Check In</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.contentContainer}>
					<ScrollView
						style={styles.scrollContainer}>
						<ListView
							dataSource={this.state.dataSource}
							renderRow={(rowData) => 
								<View style={styles.listItem}>
									<Text style={styles.listItemText}>{rowData}</Text>
								</View>
							}></ListView>
					</ScrollView>
				</View>
				<View style={styles.addCommmentContainer}>
					<TextInput
						ref={component => this._textinput = component}
						placeholder="Any comments?"
						onChangeText={(t) => { this.setState({comment: t})}}
						style={styles.textComment}>
					</TextInput>
					<TouchableOpacity
						onPress={this.addPressed.bind(this)}
						style={styles.btnAddComment}>
						<Text style={styles.btnAddCommentText}>Send</Text>
					</TouchableOpacity>
				</View>
			</View>		
		);
	}
};

module.exports = CampfireDetailView;