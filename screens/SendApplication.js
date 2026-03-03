import React from 'react';
import styles, { colors } from '../styles/index';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import { withStore } from '../stores/AppStore';
import RNVideoHelper from 'react-native-video-helper';


const { width, height } = Dimensions.get('window');

@withStore
@observer
export default class SendApplication extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    progress: 0, // не всегда достигает 1
    compressed_video: null
  }

  async compressVideo(uri) {
    try {
      return await RNVideoHelper.compress(uri, {
        quality: 'low', // default low, can be medium or high
        defaultOrientation: 0
      }).progress(progress => {
        this.setState({progress})
      })
    } catch (e) {
      console.warn(e)
    }
  }

  async componentDidMount() {
    const { uri, type } = this.props.route.params
    if(type === "photo") {
      this.setState({progress: 1})
      return;
    }
    const compressed_video = await this.compressVideo(uri)
    this.setState({
      progress: 1,
      compressed_video
    })
  }

  render() {
    const {
      store,
      route: {
        params: {
          relativeRatio,
          uri, 
          type: typeOfPreview
        }
      },
      navigation
    } = this.props;


    return (
      <View style={{paddingTop: Constants.statusBarHeight, flex: 1}}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => {
            store.currentVideo = null
            store.currentImage = null
            navigation.goBack()}}
          >
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>Отправить заявку</Text>
          <View style={{ flex: 1, marginRight: 32 }}></View>
        </View>
        <View style={{backgroundColor: colors.black, flex:1, 
                      width: width, alignItems: 'center'}}>
          <View 
             style={{ position: 'relative', width: '100%' }}
          >
            {typeOfPreview === "photo"
              ? <Image
                  source={{ uri }}
                  resizeMode="contain"
                  style={{width: width, height: width*relativeRatio}}
                />
              : null}

            {typeOfPreview === "video"
              ?
                <Video source={{ uri }}
                  rate={1.0} volume={1.0} isMuted={true} 
                  resizeMode="contain" 
                  shouldPlay isLooping
                  style={{width: '100%', height: width*relativeRatio}}
                />
              : null
            }
            
            <View style={{
                ...styles.cameraBorder,
                // backgroundColor: 'rgba(25,25,25,0.5)',
                top:0, 
                height: width*relativeRatio/2-width/2,
              }}
            />

            <View style={{
                ...styles.cameraBorder,
                // backgroundColor: 'rgba(25,25,25,0.5)',
                bottom:0, 
                height: width*relativeRatio/2-width/2,
                // height: width*(relativeRatio-1)
              }}
            >
              {typeOfPreview === 'video'
                ? <View style={{
                      position: 'absolute',
                      width: width*this.state.progress,
                      backgroundColor: 'rgb(50,50,50)',
                      height: 35,
                      left: 0,
                      top: 0
                    }}/>
                : null
              }
            </View>
          </View>

          <TouchableOpacity
            onPress={async () => {
              let localUri = '';
              if (typeOfPreview === "photo") {
                localUri = uri
              } else {
                localUri = "file://" + this.state.compressed_video
              }
              let filename = localUri.split('/').pop();

              let match = /\.(\w+)$/.exec(filename);
              let type = match ? `image/${match[1]}` : `image`;

              let formData = new FormData();
              formData.append('action', 'upload-file');
              formData.append('file', { uri: localUri, name: filename, type: type });
              // this.refs['toast'].show("Путь к файлу: "+localUri, 2000);
              store.loading = true;
              fetch(store.apiUrl, {
                method: 'POST',
                body: formData,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
              })
                .then(async (response) => {
                  if (response.ok) {
                    const fileReq = await response.json();
                    if (fileReq.success && fileReq.data.src) {
                      let attachmentSrc = fileReq.data.src;
                      let result = await store.apiCall('edit-application', {
                        id: store.resendApplication,
                        customer: store['userId'],
                        challenge: store.currentChallenge.id,
                        status: 'pending',
                        comment: store['applicationComment'],
                        adminComment: '',
                        attachmentSrc: attachmentSrc,
                        isVideo: store['currentVideo'] ? true : false,
                      });
                      await store.loadData();
                      navigation.reset({
                        index: 0,
                        routes: [{name: "Account",
                          params: {
                            message: 'Ваша заявка отправлена'
                          }
                        }]
                      })
                      store.currentChallenge = null;
                      store.currentVideo = null;
                      store.currentImage = null;
                    }
                  }
                })
                .catch((error) => {
                  console.error(error);
                  this.refs['toast'].show('Ошибка: ' + error, 2000);
                })
                .finally(() => {
                  store.loading = false;
                })
            }}
            style={{
              ...styles.profileButton,
              backgroundColor: 
                this.state.progress < 1
                ? 'rgb(40, 40, 40)'
                : colors.orange,
              position: 'absolute',
              bottom: 10
            }}
            disabled={ this.state.progress < 1 }
          >
            <Text style={styles.buttonText}>Отправить</Text>

          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="top" />
      </View>
    );
  }
}

