import React from 'react';
import styles, { colors } from '../styles/index';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image, Dimensions, ImageBackground, BackHandler } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Audio, Video } from 'expo-av';
import dayjs from 'dayjs';
import AwardsDetails from './AwardsDetails'
import ShowChallenge from '../components/ShowChallenge';
import Constants from 'expo-constants';
import {withStore} from '../stores/AppStore'
import Preview from '../components/Preview'

const { width, height } = Dimensions.get('window');

@withStore
@observer
export default class Challenge extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  async componentDidMount() {
    
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;
    let item = store.currentChallenge;
  
    let brandLogo = null;
    let brand = store.get('brands', item.brand);
    
    if (brand && brand.logoMedium) {
      brandLogo = { uri: store.serverUrl + '/uploads' + brand.logoMedium };
    }

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')}
                    style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text
            style={[
              styles.headerTitle,
              {
                fontSize: store.currentChallenge.title.length > 20 ? 14 : 18,
                maxWidth: '75%',
              },
            ]}
          >
            {store.currentChallenge.title}
          </Text>
          <View style={{ flex: 1 }}></View>

          <TouchableOpacity
            onPress={() => {
              store.currentBrand = item.brand;
              navigate('Brand');
            }}
          >
            {brandLogo 
              ? <Image
                  source={brandLogo}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                  }}
                />
              : null}
          </TouchableOpacity>
        </View>
        <FlatList
          ListHeaderComponent={
          <>
            <ShowChallenge store={store} navigate={navigate} item={item} isItTiles={false} showFooter={true} showHeader={false} showBody={true} showSound={true} />
        
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                minHeight: 40,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              {store.currentChallenge.rules}
            </Text>
            
            {parseInt(item.start) > new Date().getTime() 
              ? <Text
                  style={{
                    marginHorizontal: 10,
                    minHeight: 40,
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                >
                  Скоро мы запустим этот челлендж
                </Text>
              : parseInt(item.end) < new Date().getTime()
                ? <Text
                    style={{
                      marginHorizontal: 10,
                      minHeight: 40,
                      textAlign: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    Срок проведения истёк {dayjs(new Date(parseInt(item.end))).format('DD.MM.YY HH:mm')}
                  </Text>
                : item.participationCost > 0 && store.balance < item.participationCost ?
                  <Text
                    style={{
                      color: colors.red,
                      marginHorizontal: 10,
                      minHeight: 40,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    Недостаточно монет для участия в челлендже
                  </Text>
              : null
            }
            
            <View 
              style={{...styles.profileItem,
                paddingTop: 20,
                borderColor: colors.blue2,
                borderTopWidth: StyleSheet.hairlineWidth,
                paddingHorizontal: 15,
              }}
            > 
              <Text
                style={
                  {
                    fontFamily:'MontserratSemiBold',
                    fontSize: 14,
                    color: colors.main,
                  }}
                >
                Заявки других пользователей
              </Text>
                {item.applications.length
                  ? <Text style={[styles.text,{fontSize: 14}]}>{item.applications.length} заявок</Text>
                  : null
                }
            </View>
          </>
          }
          numColumns={1}
          data={item.applications}
          contentContainerStyle={{ width: width }}
          
          renderItem = { (application) => {
            const apItem = application.item
            // const currentCustomer= JSON.parse(apItem.customer)
            return(
            <View style={{ marginVertical: 5 }}>
              <Preview application={application.item.data} 
                apItem={apItem} navigate={navigate} challengeScreen={true}/>
              <View style={{...styles.profileItem,
                position: 'absolute',
                top: 10
              }}>
                <TouchableOpacity
                  // onPress={async () => {
                  //   store.loading = true;
                  //   let applicationLikesCount = application.likesCount ? parseInt(application.likesCount) : 0;
                  //   if (store.likes[application.id]) {
                  //     if (applicationLikesCount > 0) {
                  //       store.currentLikesCount = applicationLikesCount - 1;
                  //     }
                  //     let result = await store.apiCall('remove-like', {
                  //       id: application.id,
                  //     });
                  //     store.likes[application.id] = 0;
                  //   } else {
                  //     store.currentLikesCount = applicationLikesCount + 1;

                  //     let result = await store.apiCall('add-like', {
                  //       id: application.id,
                  //     });
                  //     store.likes[application.id] = 1;
                  //   }
                  //   application.likesCount = store.currentLikesCount;
                  //   await store.loadData();
                  //   store.loading = false;
                  // }}
                  style={{
                    backgroundColor: 'rgba(19, 63, 80, 0.75)',
                    borderRadius: 10,
                    padding: 5,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: 60,
                  }}
                >
                  <Image
                    source={store.likes[application.id] ? require('../assets/images/icon-like-on.png') : require('../assets/images/icon-like-off.png')}
                    resizeMode="cover"
                    style={styles.likeIcons}
                  />

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'MontserratLight',
                      color: '#fff',
                    }}
                  >
                    {application.likesCount ? application.likesCount : 0}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>)
          }}

          ListEmptyComponent={
            <Text
              style={{
                padding: 15,
                marginBottom: 15,
                color: colors.textGray,
                textAlign: 'center'
              }}
            >
              Здесь еще нет заявок
            </Text>
          }
        />
      </View>
    )
  }
}

