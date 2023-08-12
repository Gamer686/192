import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
	ScrollView,
	TouchableOpacity,
	Image,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import * as Permissions from 'expo-permissions';

import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';

import Filter1 from './Filter1';
import Filter2 from './Filter2';
import Filter3 from './Filter3';
import Filter4 from './Filter4';




let data = {
	Flower: [
		{
			id: '1',
			image: require('../assets/cool.png'),
		},
	],
	Crown: [
		{
			id: '2',
			image: require('../assets/butterfly.png'),
		},
		
	],
	Hair: [
		{
			id: '3',
			image: require('../assets/cute.png'),
		},
	],
	Hat: [
		{
			id: '4',
			image: require('../assets/cute2.png'),
		},
		
	],
	
};

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			faces: [],
			current_filter: 'filter_1',
			selected: 'aviator',
		};
		this.onCameraPermission = this.onCameraPermission.bind(this);
		this.onFacesDetected = this.onFacesDetected.bind(this);
		this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
	}

	componentDidMount() {
		Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
	}

	onCameraPermission({ status }) {
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	onFacesDetected({ faces }) {
		this.setState({ faces: faces });
	}

	onFaceDetectionError(error) {
		console.log(error);
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		}
		if (hasCameraPermission === false) {
			return (
				<View style={styles.container}>
					<Text>No access to camera</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.headingContainer}>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<Text style={styles.titleText1}>CuteMe</Text>
						<Text style={styles.titleText2}>APP</Text>
					</View>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
						<Text style={styles.subheading1}>To Our</Text>
						<Text style={styles.subheading2}> beauty filters</Text>
					</View>
				</View>
				<View style={styles.cameraStyle}>
					<Camera
						style={{ flex: 1 }}
						type={Camera.Constants.Type.front}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
							runClassifications: FaceDetector.FaceDetectorClassifications.all,
						}}
						onFacesDetected={this.onFacesDetected}
						onFacesDetectionError={this.onFacesDetectionError}
					/>
					{this.state.faces.map((face) => {
						if (this.state.current_filter === 'filter_1') {
							return <Filter1 key={face.faceID} face={face} />;
						} else if (this.state.current_filter === 'filter_2') {
							return <Filter2 key={face.faceID} face={face} />;
						} else if (this.state.current_filter === 'filter_3') {
							return <Filter3 key={face.faceID} face={face} />;
						} else if (this.state.current_filter === 'filter_4') {
							return <Filter4 key={face.faceID} face={face} />;
            }
           
					})}
				</View>
				<View style={styles.framesContainer}>
					<View style={styles.categoryContainer}>
						<TouchableOpacity
							style={
								this.state.selected == 'butterfly'
									? styles.categoryBoxSelected
									: styles.categoryBox
							}
							onPress={() => this.setState({ selected: `butterfly` })}>
							<Text>Regular</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={
								this.state.selected == 'cool'
									? styles.categoryBoxSelected
									: styles.categoryBox
							}
							onPress={() => this.setState({ selected: `cool` })}>
							<Text>Wayfarer</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={
								this.state.selected == 'cute2'
									? styles.categoryBoxSelected
									: styles.categoryBox
							}
							onPress={() => this.setState({ selected: `cute2` })}>
							<Text>Rimless</Text>
						</TouchableOpacity>
											</View>
					<ScrollView
						style={{ flexDirection: 'row', flex: 0.6 }}
						horizontal
						showsHorizontalScrollIndicator={false}>
						{data[this.state.selected].map((filter_data) => {
							return (
								<TouchableOpacity
									style={styles.filterImageContainer}
									onPress={() =>
										this.setState({ current_filter: `filter_${filter_data.id}` })
									}>
									<Image source={filter_data.image} style={{ height: 32, width: 80 }} />
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	headingContainer: {
		flex: 0.15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#7fc7af',
	},
	titleText1: {
		fontSize: RFValue(30),
		fontWeight: 'bold',
		color: '#dad8a7',
		fontStyle: 'italic',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -3, height: 3 },
		textShadowRadius: 1,
	},
	titleText2: {
		fontSize: RFValue(30),
		fontWeight: 'bold',
		color: 'white',
		fontStyle: 'italic',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -3, height: 3 },
		textShadowRadius: 1,
	},
	subheading1: {
		fontSize: RFValue(20),
		color: '#ff9e9d',
		fontStyle: 'italic',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -3, height: 3 },
		textShadowRadius: 1,
	},
	subheading2: {
		fontSize: RFValue(20),
		color: 'white',
		fontStyle: 'italic',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -3, height: 3 },
		textShadowRadius: 1,
	},
	cameraStyle: {
		flex: 0.65,
	},
	framesContainer: {
		flex: 0.2,
		paddingLeft: RFValue(20),
		paddingRight: RFValue(20),
		paddingTop: RFValue(10),
		backgroundColor: '#b2003c',
	},
	filterImageContainer: {
		height: RFPercentage(8),
		width: RFPercentage(15),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#077900',
		borderRadius: 30,
		marginRight: 20,
	},
	categoryContainer: {
		flex: 0.4,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: RFValue(10),
	},
	categoryBox: {
		flex: 0.2,
		borderRadius: 30,
		borderWidth: 1,
		backgroundColor: 'white',
		width: '100%',
		padding: RFValue(3),
		margin: 1,
		alignItems: 'center',
	},
	categoryBoxSelected: {
		flex: 0.2,
		borderRadius: 30,
		borderWidth: 1,
		backgroundColor: '#004582',
		width: '100%',
		padding: RFValue(3),
		margin: 1,
		alignItems: 'center',
	},
});
