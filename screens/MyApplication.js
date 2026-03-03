import React, { useState } from 'react';
import styles, { colors } from '../styles/index';
import { Linking, Share, Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');
import dayjs from 'dayjs';
import SendApplicationModal from '../components/SendApplicationModal';
import { withStore } from '../stores/AppStore';

@withStore
@observer
export default class MyApplication extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props)
    this.state = {show: false}
  }
 
  render() {
    const p = this.props;
    const navigation = p.navigation
    const { navigate, goBack } = p.navigation;
    const item = p.route.params.application

    const store = p.store;
    let challenge = store.get('challenges', item.challenge);
    let brandLogo = null;
    let brand = store.get('brands', challenge.brand);
    if (brand && brand.logoMedium) {
      brandLogo = { uri: store.serverUrl + '/uploads' + brand.logoMedium };
    }

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} /> 
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={[styles.headerTitle]}>Моя заявка</Text>
          <View style={{ flex: 1, marginRight: 50 }}></View>
        </View>

       
        <ScrollView >
          {item.answer 
            ? <View style={{...styles.sortListSlide,
                position: 'relative'}}>
                {store.renderAnswer(item)}
              </View>
            : <View style={{...styles.sortListSlide, 
                            position: 'relative' 
                          }}
              >
                { item.attachment.indexOf('.mp4') > -1 
                    || item.attachment.indexOf('.mov') > -1 
                  ? <Video
                      source={{ uri: store.serverUrl + '/uploads' + item.attachment }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                      resizeMode="cover"
                      shouldPlay
                      isLooping
                      style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />
                  : <Image resizeMode="cover"
                      source={{uri: store.serverUrl+'/uploads'+item.attachment}}style={{position:'absolute',width:'100%',height:'100%'}} 
                    />
                }

                {item.status == 'won'
                  ? <View
                      style={{
                        backgroundColor: 'rgba(19, 63, 80, 0.75)',
                        borderRadius: 15,
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        source={store.likes[item.id] ? require('../assets/images/icon-like-on.png') : require('../assets/images/icon-like-off.png')}
                        resizeMode="cover"
                        style={{ width: 30, height: 30, marginRight: 10 }}
                      />

                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: 'MontserratSemiBold',
                          color: '#fff',
                        }}
                      >
                        {store.likes[item.id] ? store.likes[item.id] : 0}
                      </Text>
                    </View>
                  : null}
              </View>
          }
          <View
            style={{
              height: 50,
              borderColor: colors.blue2,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                store.currentChallenge = store.get('challenges', item.challenge)
                navigate('Challenge', {
                  // challenge: application.challenge
                });
                // p.navigation.dispatch(StackActions.reset({
                //   index: 0,
                //   actions: [NavigationActions.navigate({ routeName: 'Challenge' })]
                // }));
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                {challenge.title}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                store.currentBrand = challenge.brand;
                navigate('Brand');
              }}
            >
              {brandLogo ? (
                <Image
                  source={brandLogo}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={{ padding: 15, alignItems: 'center' }}>
            
            {item.status == 'rejected'
              ? <><TouchableOpacity onPress={() => this.setState({show: true})}>
                  <View
                    style={[
                      styles.profileButton,
                      {
                        backgroundColor: colors.orange,
                      },
                    ]}
                  >
                    <Text style={styles.buttonText}>Переотправить заявку</Text>
                  </View>
                </TouchableOpacity>

                <SendApplicationModal challenge={challenge}
                  show={this.state.show}
                  close={() => this.setState({show: false})}
                  showGallery={async () => {
                    let file = store.takePhotoAndUpload()
                    if (file) {
                      this.setState({show: false})
                      store.currentChallenge = store.get('challenges', item.challenge)
                      store.resendApplication = item.id
                      navigate('SendApplication')
                    }
                  }}
                  takePhoto = {() => {
                    this.setState({show: false})
                    store.currentChallenge = store.get('challenges', item.challenge)
                    store.resendApplication = item.id
                    navigate('CameraPage')
                  }}
                />

                {item.rejectReason != ''
                  ? <View style={styles.wrapper}>
                      <Text style={{ fontSize: 12 }}>
                        Сообщение от модератора:
                        {item.rejectReason}
                      </Text>
                    </View>
                  : null
                }
                </>
              : null
            } 

            {item.status == 'pending'
            ? <TouchableOpacity
                onPress={async () => {
                  let result = await store.apiCall('change-application', {
                    id: item.id,
                    status: 'cancelled',
                  });
                  store.loadData();
                  goBack();
                }}
                style={{ ...styles.profileButton, backgroundColor: colors.orange }}
              >
                <Text style={styles.buttonText}>Отменить заявку</Text>
              </TouchableOpacity>
            : null}
          </View>
        </ScrollView>
      </View>
    )
  }
}


         {/* {false ? (

                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await CameraRoll.saveToCameraRoll(store.serverUrl + '/uploads' + item.attachment, 'photo');
                      let instagramURL = `instagram://library?AssetPath=null`;
                      //let instagramURL = `http:/instagram.com/_u/#Intent;package=com.instagram.android;scheme=https;end`;
                      Linking.openURL(instagramURL);
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.button,
                      {
                        margin: 20,
                        marginVertical: 10,
                        marginBottom: 20,
                        backgroundColor: '#6288be',
                      },
                    ]}
                  >
                    <Text style={styles.profileButtonText}>Instagram</Text>
                  </View>
                </TouchableOpacity>
                  ) : null} */}