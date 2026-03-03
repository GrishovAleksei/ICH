import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, Alert} from 'react-native';
import { Video } from 'expo-av';
import styles, { colors } from '../styles/index';
import AwardsDetails from '../screens/AwardsDetails';
// import SendApplicationModal from './SendApplicationModal';
import {store} from '../stores/AppStore'


const { width } = Dimensions.get('window');

function checkBalance(item, store, setShowModal) {
  if (item.participationCost > 0 && store.balance < item.participationCost) {
    Alert.alert(
      "Недостаточно монет",
      "Пожалуйста, выберите другой челлендж",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    )
  }
  else setShowModal(true) 
}

function preview (type) {
  console.log(this.item.preview)
  switch (type) {
    case 'PHOTO':
      return (
        <Image
          source={{uri: this.item.preview}}
          style={styles.challengeImage}
        />
      )
    case 'VIDEO':
      return (
        <Video
          source={{uri: this.item.preview}}
          rate={1.0}
          volume={1.0}
          isMuted={this.isMuted}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.challengeImage}
        />
      )
    default:
      return (
        <View style={styles.challengeImage}>
          {store.renderAnswer}
        </View>
      )
  }
}

export default function ShowChallenge ({navigate, item, isItTiles, showFooter, showHeader, showBody, showSound}) {
  const [showAwards, setShowAwards] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isMuted, setMute] = useState(true)
  console.log(">>>>>>", item)
  // let brandLogo = null;
  // let brand = store.get('brands', item.brand);
  
  // if (brand && brand.logoMedium) {
  //   brandLogo = { uri: store.serverUrl + '/uploads' + brand.logoMedium };
  // } else {
  //   if (brand && brand.logo) {
  //     brandLogo = { uri: store.serverUrl + '/uploads' + brand.logo };
  //   }
  // }

  // let isVideo = false;

  // if (item && item.preview && (item.preview.indexOf('.mp4') > -1 || item.preview.indexOf('.mov') > -1)) {
  //   isVideo = true;
  // }

  
  // if( isItTiles ) {
  //   return (
  //     <TouchableOpacity
  //       // onPress={() => {
  //       //   store.currentChallenge = item;
  //       //   navigate('Challenge');
  //       // }}
  //       style={{margin: 1}}
  //     >
  //       <View style={styles.preview}>
  //         {isVideo
  //         ? <Video
  //             source={{ uri: store.serverUrl + '/uploads' + item.preview }}
  //             rate={1.0}
  //             volume={1.0}
  //             isMuted={true}
  //             resizeMode="cover"
  //             shouldPlay
  //             isLooping
  //             style={styles.challengeImage}
  //           />
  //         : <Image source={{uri:store.serverUrl +'/uploads'+item.preview }}  
  //             style={styles.challengeImage} 
  //             resizeMode="cover" />
  //         }
  //         <Text
  //           style={{
  //             ...styles.bodyFrame,
  //             bottom: 5,
  //             left: 3,
  //           }}
  //         > 
  //           {shorthand(item.title, 14)}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }

  return (
    <TouchableOpacity
      // onPress={() => {
      //   store.currentChallenge = item;
      //   navigate('Challenge');
      // }}
    >
      <View>
        {showHeader
          ? <View style={styles.settingsHeader}>
              <Text
                style={{
                  fontFamily: 'MontserratSemiBold',
                  fontSize: 18,
                }}
              >
                {item.name}
              </Text>
              <TouchableOpacity
                // onPress={() => {
                //   store.currentBrand = item.brand;
                //   navigate('Brand');
                // }}
              >
                {/* {brandLogo ? (
                  <Image
                    source={brandLogo}
                    style={styles.brandLogo}
                  />
                ) : null} */}
              </TouchableOpacity>
            </View>
          : null
        }

        <View style={styles.sortListSlide}>
          {console.log(item.challenge_type)}
          {preview(item.challenge_type)}

          {/* {showBody
            ? <>
                <View
                  style={{
                    ...styles.bodyFrame,
                    bottom: 15,
                    left: 15,
                  }}
                >
                  <Image
                    source={require('../assets/images/icon-my-awards.png')}
                    style={{
                      marginRight: 5,
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                    }}
                  />
                  <Text style={styles.iconText}>
                    {item.applications ? item.applications.length : 0} / {item.winners}
                  </Text>
                </View>
                
                <View
                  style={{
                    ...styles.bodyFrame,
                    bottom: 15,
                    right: 15,
                  }}
                >
                  <Image
                    source={require('../assets/images/icon-date.png')}
                    style={{
                      marginRight: 5,
                      width: 20,
                      height: 20,
                      resizeMode: 'cover',
                    }}
                  />
                  <Text style={styles.iconText}>
                    {dayjs(new Date(parseInt(item.start))).format('DD.MM.YY')} - {dayjs(new Date(parseInt(item.end))).format('DD.MM.YY HH:mm')}
                  </Text>
                </View>
                  
                {showSound
                  ? isVideo
                    ? <TouchableOpacity
                        style={{
                          ...styles.bodyFrame,
                          top: 15,
                          left: 15,
                          
                        }}
                        // onPress={() => setMute(!isMuted)}
                      >
                        <Text style={{ fontSize: 12, fontFamily: 'MontserratLight', color: '#fff' }}>
                          {!isMuted ? 'Выкл. звук' : 'Вкл. звук'}
                        </Text>
                      </TouchableOpacity>
                    : null
                  :null
                }

                {item.participationCost > 0
                  ? <View
                      style={{
                        ...styles.bodyFrame,
                        top: 15,
                        right: 15,
                       
                      }}
                    >
                      <Image
                        source={require('../assets/images/icon-cost.png')}
                        style={{
                          marginRight: 5,
                          width: 20,
                          height: 20,
                          resizeMode: 'cover',
                        }}
                      />
                      <Text style={styles.iconText}>
                        {item.participationCost} М
                      </Text>
                    </View>
                  : null
                }

                {parseInt(item.end) < new Date().getTime() 
                  ? <View
                      style={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        top: 15,
                        left: 15,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        source={require('../assets/images/logo-old.png')}
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  : null
                }
              </>
            : null
          } */}
        </View>
        
        {/* {showFooter
          ? <View
              style={{
                height: 50,
                borderColor: colors.blue2,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Image
                source={
                  item.complexity == 10
                    ? require('../assets/images/complexity-3.png')
                    : item.complexity == 5
                    ? require('../assets/images/complexity-2.png')
                    : require('../assets/images/complexity-1.png')
                }
                style={{
                  ...styles.tabIcon
                }}
              />

              <AwardsDetails show={showAwards}
                close={() => setShowAwards(false)}/>
              <SendApplicationModal 
                challenge={item}
                show={showModal}
                close={() => setShowModal(false)}
                showGallery={async () => {
                  let uri = await store.takePhotoAndUpload(item.type);
                  if (uri) {
                    store.currentChallenge = item
                    store.resendApplication = 0;
                    setShowModal(false)
                    navigate('SendApplication', 
                    {
                      relativeRatio: store.k,
                      uri: uri,
                      type: item.type
                    })
                  }
                }}
                takePhoto = {() => {
                  store.currentChallenge = item
                  store.resendApplication = 0
                  setShowModal(false)
                  navigate('CameraPage')
                }}
              />

              {item.awardSum ? (
                <View style={styles.centeredRow}>
                  <View
                    style={[styles.tabIconCircle,
                      {
                        backgroundColor: colors.orange,
                        marginRight: 5
                      }
                    ]}
                  >
                    <Image source={require('../assets/images/coins.png')} 
                      style={{...styles.tabIcon, tintColor: colors.white}} />
                  </View>

                  <Text style={styles.text}>
                    {item.awardSum}
                  </Text>
                </View>)
              : null}
              
              {item.awardType == 'other'? (
                <TouchableOpacity 
                  // onPress={() => {
                  //   store.currentChallenge = item
                  //   setShowAwards(true)
                  // }}
                  style={{
                    ...styles.tabIconCircle,
                    ...styles.tabShadow,
                    backgroundColor: colors.blue3,
                    marginRight: 5
                    
                  }}
                >
                  <Image source={require('../assets/images/icon-award.png')}
                    style={[styles.tabIcon, {tintColor: colors.white}]}/>
                </TouchableOpacity>)
              : null}

              {item.awardType == 'bonus' && item.awardAmount ? (
                <View style={styles.centeredRow}>
                  <TouchableOpacity 
                    // onPress={() => {
                    //   store.currentChallenge = item
                    //   setShowAwards(true)
                    // }}
                    style={{
                      ...styles.tabIconCircle,
                      ...styles.tabShadow,
                      backgroundColor: colors.blue3,
                      marginRight: 5,
                    }}
                  >
                    <Image
                      source={require('../assets/images/icon-fav.png')}
                      style={[styles.tabIcon, {tintColor: colors.white}]}
                    />
                    
                  </TouchableOpacity>
                  <Text style={styles.text}>
                    {item.awardAmount}
                  </Text>
                </View>)
              : null}

              {item.awardType == 'discount' && item.awardAmount ? (
                <View style={styles.centeredRow}>
                  <TouchableOpacity 
                    // onPress={() => {
                    //   store.currentChallenge = item
                    //   setShowAwards(true)
                    // }}
                    style={{
                      ...styles.tabIconCircle,
                      ...styles.tabShadow,
                      backgroundColor: colors.blue3,
                      marginRight: 5,
                    }}
                  >
                    <Image
                      source={require('../assets/images/icon-discount.png')}
                      style={[styles.tabIcon, {tintColor: colors.white}]}
                    />
                  </TouchableOpacity>

                  <Text style={styles.text}>
                    {item.awardAmount}
                  </Text>
                </View>)
              : null}

              <TouchableOpacity 
                // onPress={() => {
                //   item.participated
                //     ? Alert.alert(
                //         "Этот Челлендж Вы уже выполняли",
                //         "Пожалуйста, выберите другой челлендж",
                //         [
                //           { text: "OK" }
                //         ],
                //         { cancelable: false }
                //       )
                //     : checkBalance(item, store,
                //       setShowModal)
                // }} 
                style={[styles.tabIconCircle, styles.tabShadow,
                    {backgroundColor: colors.turquoise}]}
                disabled={false}
              >
                <Image
                  source={item.type == 'video' 
                    ? require('../assets/images/icon-video.png')
                    : (item.type == 'photo') 
                      ? require('../assets/images/icon-image.png')
                      : require('../assets/images/icon-text.png') 
                  }
                  style={[styles.tabIcon, {tintColor: colors.white}]}
                />
              </TouchableOpacity>
            </View>
          : null
        } */}
      </View>
    </TouchableOpacity>
  )
}

const shorthand = (word, maxLength) => {
  if(word.length > maxLength) return word.slice(0,maxLength-1) + '…'
  else return word
}