import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');
import dayjs from 'dayjs';
import { HeaderDropDownMenu } from '../components/HeaderItems/HeaderDropDownMenu';
import {withStore} from '../stores/AppStore'
@withStore
@observer
export default class Application extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }
  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;
    let item = p.route.params.application;
    let currentCustomer =  p.route.params.currentCustomer
    currentCustomer.id = p.route.params.currentCustomerId
    let currentLikesCount = p.route.params.currentLikesCount

    let challenge = store.get('challenges', item.challenge);
    let brandLogo = null;
    let brand = store.get('brands', challenge.brand);
    if (brand && brand.logoMedium) {
      brandLogo = { uri: store.serverUrl + '/uploads' + brand.logoMedium };
    }

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity
            onPress={() => { p.navigation.pop() }}
          >
            <Image  source={require('../assets/images/back.png')}
                    style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={{...styles.headerTitle,
                        fontSize: 18,
                        maxWidth: '75%' }}
          > Заявка пользователя </Text>
          <View style={{ flex: 1, marginRight: 5, alignItems: 'flex-end' }}>
            <HeaderDropDownMenu
              store={store}
              // applicationId={store.currentApplication.id}
              // isBlocked={store.currentApplication.is_self_blocked}
              // isShowBlockButton={store.currentCustomer.is_show_block_button}
              resCallback={(message) => {
                this.refs['toast'].show(message, 5000);
              }}
            />
          </View>
        </View>
        
        <Toast ref="toast" position="top" />



        <ScrollView >
          {item.answer
            ? <View
                style={{...styles.sortListSlide,
                        position: 'relative',
                }}
              >
                {item.answer}
              </View>
            : <View style={{...styles.sortListSlide, 
                            position: 'relative' 
                          }}
              >
                {item.attachment.indexOf('.mp4') > -1 
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
                      source={{ uri: store.serverUrl + '/uploads' + item.attachment }} 
                      style={{...styles.sortListSlide, position: 'absolute'}}
                    />
                }

                <TouchableOpacity
                  style={styles.likeArea}
                  // onPress={async () => {
                  //   let applicationLikesCount = store.currentApplication.likesCount 
                  //     ? parseInt(store.currentApplication.likesCount) 
                  //     : 0
                  //   if (store.likes[store.currentApplication.id]) {
                  //     if (applicationLikesCount > 0) {
                  //       store.currentLikesCount = applicationLikesCount - 1;
                  //     }
                  //     let result = await store.apiCall('remove-like', {
                  //       id: store.currentApplication.id,
                  //     });
                  //     store.likes[store.currentApplication.id] = 0;
                  //   } else {
                  //     store.currentLikesCount = applicationLikesCount + 1;

                  //     let result = await store.apiCall('add-like', {
                  //       id: store.currentApplication.id,
                  //     });
                  //     store.likes[store.currentApplication.id] = 1;
                  //   }
                  //   store.currentApplication.likesCount = store.currentLikesCount;
                  //   await store.loadData();
                  // }}
                >
                  <Image
                    source={currentLikesCount 
                      ? require('../assets/images/icon-like-on.png') 
                      : require('../assets/images/icon-like-off.png')
                    }
                    resizeMode="cover"
                    style={{...styles.likeIcons, marginRight: 10}}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'MontserratLight',
                      color: '#fff',
                    }}
                  >
                    {currentLikesCount ? currentLikesCount : 0 }
                  </Text>
                </TouchableOpacity>
              </View>
          }
          
          <View style={styles.settingsHeader}>
            <Text style={{ fontSize: 18 }}>
              {challenge.title}
            </Text>
            
            <TouchableOpacity
              onPress={() => {
                store.currentBrand = challenge.brand
                navigate('Brand');
              }}
            >
              {brandLogo 
                ? <Image
                    source={brandLogo}
                    style={styles.brandLogo}
                  />
                : null
              }
            </TouchableOpacity>
          </View>
          
          <Text
            style={{
              paddingTop: 20,
              fontFamily: 'MontserratSemiBold',
              paddingHorizontal: 15,
              fontSize: 18,
              color: colors.main,
            }}
          >
            Профиль пользователя
          </Text>
          
          <TouchableOpacity
            onPress={() => {
              store.currentCustomer = currentCustomer
              navigate('Profile');
            }}
            style={{
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "center"
            }}
          >
            <View style={{...styles.avatar, height: 60, width: 60}}>
              {currentCustomer.avatar && (
                <ImageBackground
                  source={{ uri: store.serverUrl + '/uploads' + currentCustomer.avatar }}
                  style={styles.image}
                ></ImageBackground>
              )}
            </View>
            
            <Text
              style={{
                marginBottom: 10,
                marginLeft: 10,
                color: colors.main,
                fontFamily: 'MontserratSemiBold',
                fontSize: 16,
              }}
            >
              {currentCustomer.name}
            </Text>
            
            <View style={{ flex: 1 }} />
            <Image
              source={require('../assets/images/icon-right.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
