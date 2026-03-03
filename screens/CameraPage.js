import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView, Image, Dimensions } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { BlurView } from 'expo-blur';

import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as MediaLibrary from 'expo-media-library'
import RNVideoHelper from 'react-native-video-helper';
import { withStore } from '../stores/AppStore';

const { width, height } = Dimensions.get('window')

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const qualityOrder = {
  '480p': '720p',
  '720p': '1080p',
  '1080p': '720p',
};

// const DESIRED_RATIO = "4:3";

@withStore
export default class CameraPage extends React.Component {

  state = {
    hasCameraPermission: null,
    rollGranted: null,
    recording: false,
    face: Camera.Constants.Type.back,
    type: 'camera',
    uploadModalVisible: false,
    flash: 'off',
    quality: '480p',
    ratio: '4:3',
  };

  relativeRatio() {
    const [ h, w ] = this.state.ratio.split(':').map(Number)
    return h/w
  }

  toggleQuality() {
    this.setState({
      quality: qualityOrder[this.state.quality],
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  async componentDidMount() {
    let status
    try {
      status = (await Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO_RECORDING, Permissions.CAMERA_ROLL)).status;
    }
    catch(e) {
      console.warn(e);
    }
    this.setState({ hasCameraPermission: status === 'granted' });
    // this.getCameraRollPermissions();
  }

  setModalVisible(visible) {
    this.setState({ uploadModalVisible: visible });
  }
  
  static navigationOptions = {
    headerShown: false,
  };


  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;
    const { hasCameraPermission } = this.state;
 
    if (hasCameraPermission === null || hasCameraPermission === false) {
      return (
        <View style={{...styles.settingsHeader, flex: 1}}>
          <View style={styles.accountHeader}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <Text style={styles.headerTitle}>Камера</Text>
            <View style={{ flex: 1, marginRight: 32 }}></View>
          </View>
          <Text style={{ flex: 1, textAlign: 'center' }}>Нет доступа к камере</Text>
        </View>
      );
    } else {
      return (
        <View style={{paddingTop: Constants.statusBarHeight, flex: 1}}>
          <View style={{...styles.settingsHeader}}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <Text style={styles.headerTitle}>Камера</Text>
            <View style={{ flex: 1, marginRight: 50 }}></View>
          </View>

          <View style={{backgroundColor: colors.black, flex:1, width: width,
                      alignItems: 'center'}}>
            <Camera
              ref={(ref) => {
                this.camera = ref;
              }}
              // onCameraReady={this.prepareRatio}
              // ratio={this.state.ratio}
              style={{ 
                width: "100%",
                height: width*this.relativeRatio(),
              }}
              type={this.state.face}
            >
              <View style={{
                  ...styles.cameraBorder,
                  // backgroundColor: 'rgba(25,25,25,0.5)',
                  top:0, 
                  height: width*this.relativeRatio()/2-width/2,
                }}
              />
              <View style={{
                 ...styles.cameraBorder,
                //  backgroundColor: 'rgba(25,25,25,0.5)',
                  bottom:0, 
                  height: width*this.relativeRatio()/2-width/2,
                }}
              />
              {/* <View style={{
                 ...styles.cameraBorder,
                  bottom:0, 
                  height: width*(this.relativeRatio()-1),
                }}
              /> */}
            </Camera>
            
            <BlurView tint="default" intensity={95} 
              style={{...styles.cameraPane, position: 'absolute', bottom: 15}}>
              <TouchableOpacity
                style={[styles.cameraBtn, styles.toggleCameraBtn]}
                onPress={() => {
                  this.setState({
                    face: this.state.face === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
                  });
                }}
              >
                <FontAwesome name="refresh" style={styles.cameraIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{...styles.cameraBtn, ...styles.recordBtn, zIndex: 1,}}
                disabled={ store.loading ? true : false }
                onPress={async () => {
                  if (store.currentChallenge.type == 'video') {
                    if (!this.state.recording) {
                      const promise = this.camera.recordAsync({
                        quality: '4:3',
                        maxDuration: 30,
                        mute: true,
                      });
                      if (promise) {
                        this.setState({ recording: true });
                        const data = await promise;
                        this.setState({ recording: false });
                        if (data) {
                          console.warn(data.uri)
                          
                          navigate('SendApplication',
                            {
                              relativeRatio: this.relativeRatio(),
                              uri: data.uri,
                              type: "video"
                            }
                          )
                          return
                        }
                      }
                    } else {
                      try {
                        this.camera.stopRecording();
                      } catch (e) {}
                    }
                  } else {
                    if (this.camera) {
                      store.loading = true;
                      const photo = await this.camera.takePictureAsync({
                        quality: 0.3
                      });
                      store.loading = false;
                      if (photo) {
                        store.currentImage = photo.uri;
                        const asset = await MediaLibrary.createAssetAsync(photo.uri)

                        MediaLibrary.createAlbumAsync('Ichazy',asset)
                          .then(() => {
                            console.log('Album created!');
                          })
                          .catch(error => {
                            console.log('err', error);
                          });

                        navigate('SendApplication', {
                          relativeRatio: this.relativeRatio(),
                          uri: photo.uri,
                          type: "photo" }
                        )
                      }
                    }
                  }
                }}
              >
                <FontAwesome
                  name={!this.state.recording ? 'circle' : 'stop'}
                  style={!this.state.recording ? [styles.cameraIcon, styles.cameraIconBig, styles.cameraRecordIcon] : [styles.cameraIcon, styles.cameraIconBig]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cameraBtn, styles.modeBtn]}
                onPress={() => {}}
              >
                <FontAwesome name={store.currentChallenge.type == 'video' ? 'video-camera' : 'camera'} style={styles.cameraIcon} />
              </TouchableOpacity>
            </BlurView>
          </View>
        </View>
      );
    }
  }
}
