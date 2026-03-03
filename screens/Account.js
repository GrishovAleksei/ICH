 import React from 'react';
import styles, { colors } from '../styles/index';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { Video } from 'expo-av';
import ShowChallenge from '../components/ShowChallenge';
import {withStore} from '../stores/AppStore'
import Toast from 'react-native-easy-toast';
import { store } from '../stores/AppStore'

const { width, height } = Dimensions.get('window');

@withStore
@observer
export default class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transactionsLoaded: false,
      showAmountDesc: false,
      showCodeModal: false,
      codeModalData: null,
      refreshing: false
    };
  }

  _showCodeModal = (showCodeModal, codeModalData) => {
    this.setState({ showCodeModal, codeModalData });
  };

  // _renderPromoCodeModalBody = () => {
  //   const { codeModalData } = this.state;
  //   let view = null;

  //   if (codeModalData) {
  //     const type = codeModalData.promoViewType === 'text_qr' ? 'qr' : 'ean13';
  //     const imageUrl = store.serverUrl + '/index.php?action=get-barcode&s=' + type + '&t=' + codeModalData.promo;
  //     // console.log(imageUrl)
  //     let text = <Text style={{ fontSize: 22, fontFamily: 'MontserratLight', textAlign: 'center' }}>{codeModalData.promo}</Text>;

  //     if (codeModalData.promoViewType === 'text') {
  //       view = text;
  //     } else {
  //       view = (
  //         <View style={{ justifyContent: 'center' }}>
  //           <Image
  //             style={{
  //               alignSelf: 'center',
  //               width: 500,
  //               height: 300,
  //               resizeMode: 'contain',
  //             }}
  //             source={{ uri: imageUrl }}
  //           />
  //           {text}
  //         </View>
  //       );
  //     }

  //     return (
  //       <View
  //         style={{
  //           padding: 15,
  //           marginTop: 50,
  //           justifyContent: 'center',
  //         }}
  //       >
  //         {view}
  //       </View>
  //     );
  //   }
  //   return view;
  // };

  // componentDidMount() {
  //   if(this.props.route?.params !== undefined) {this.refs['toast'].show(this.props.route.params.message, 3000) }
  // }
 
  render() {
    const p = this.props;
    const { navigate, goBack } = this.props.navigation;
    let awards = store.showOldAwards ? store.usedAwards : store.awards;

    return (
      <View ref={view => store.accountView = view}
        collapsable={false} 
        style={{flex: 1}}>
        
        {/* {store.currentTab == 'fav' ? (
          <View style={styles.accountLayout}>
            <View style={styles.settingsHeader}>
              <TouchableOpacity 
                onPress={() => store.currentTab = 'list'}
              >
                <Image source={require('../assets/images/back.png')}
                                style={styles.backIcon} />
              </TouchableOpacity>
              
              <View style={{ flex: 1 }} />
              <Text style={styles.headerTitle}>
                {store.showOldAwards ? 'История наград' : 'Награды'}
              </Text>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={() => {
                  store.showOldAwards = !store.showOldAwards;
                  awards = store.showOldAwards ? store.usedAwards : store.awards;
                }}
                style={{ paddingLeft: 5 }}
              >
                <Image source={store.showOldAwards ? require('../assets/images/logo-old.png') : require('../assets/images/logo-new.png')} style={styles.accountSettingsIcon} />
              </TouchableOpacity>
            </View>
              
            <View
              style={{
                flex: 1,
                width: '100%',
              }}
            >
              {awards.length ? (
                <View style={styles.feedContainer}>
                  <FlatList
                    contentContainerStyle={{
                      paddingBottom: 70,
                    }}
                    windowSize={2}
                    initialNumToRender={2}
                    renderItem={({ item }) => {
                      let brandLogo = null;
                      let challenge = store.get('challenges', item.challenge);
                      let brand = store.get('brands', challenge.brand);
                      let awardIcon;
                      // console.log("TEXT ----->" , item.awardText)
                      // console.log("challenge ---->>>" , challenge)

                      // if (item.awardType == 'discount') {
                      //   awardIcon = require('../assets/images/icon-discount.png');
                      // } else if (item.awardType == 'bonus') {
                      //   awardIcon = require('../assets/images/icon-fav.png');
                      // } else {
                      //   awardIcon = require('../assets/images/icon-award.png');
                      // }

                      if (brand && brand.logoMedium) {
                        brandLogo = { uri: store.serverUrl + '/uploads' + brand.logoMedium };
                      } else {
                        if (brand && brand.logo) {
                          brandLogo = { uri: store.serverUrl + '/uploads' + brand.logo };
                        }
                      }

                      return (
                        <View>
                          <View
                            style={{
                              height: 50,
                              paddingHorizontal: 15,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                store.currentChallenge = store.get('challenges', item.challenge);
                                navigate('Challenge');
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: 'MontserratRegular',
                                  fontSize: 18,
                                }}
                              >
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                store.currentBrand = challenge.brand;
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
                          <View style={{ height: width }}>
                            { item.attachment && (item.attachment.indexOf('.mp4') > -1
                              || item.attachment.indexOf('.mov')  > -1
                              || item.attachment.indexOf('.webm') > -1)
                              ? <Video
                                  source={{ uri: store.serverUrl + '/uploads/' + item.attachment }}
                                  rate={1.0}
                                  volume={1.0}
                                  isMuted={true}
                                  resizeMode="cover"
                                  shouldPlay
                                  isLooping
                                  style={styles.challengeImage}
                                />
                              : <Image
                                  source={{ uri: store.serverUrl + '/uploads/' + item.attachment }}
                                  style={styles.challengeImage}
                                />
                            }

                            <TouchableOpacity
                              onPress={() => {
                                this._showCodeModal(true, {
                                  promoViewType: challenge.promoViewType,
                                  promo: item.awardText,
                                });
                              }}
                              style={{
                                ...styles.bodyFrame,
                                backgroundColor: colors.blue,
                                borderRadius: 8,
                                bottom: 15,
                                left: 15,
                              }}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                  textAlign: 'center',
                                }}
                              >
                                Показать код
                              </Text>
                            </TouchableOpacity>

                            <View
                              style={{
                                ...styles.bodyFrame,
                                backgroundColor: store.showOldAwards && parseInt(item.awardEnd) < new Date().getTime() ? colors.red : 'rgba(19, 63, 80, 0.75)',
                                bottom: 15,
                                right: 15,
                              }}
                            >
                              <Text style={{ fontSize: 12, fontFamily: 'MontserratLight', color: '#fff' }}>
                                {store.showOldAwards && parseInt(item.awardEnd) < new Date().getTime()
                                  ? 'действовало до ' + dayjs(new Date(parseInt(item.awardEnd))).format('DD.MM.YY')
                                  : 'действует до ' + dayjs(new Date(parseInt(item.awardEnd))).format('DD.MM.YY')}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              height: 50,
                              borderColor: colors.blue2,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 10,
                              }}
                            >
                              {challenge.awardAmount && challenge.awardAmount !== '' && challenge.awardAmount !== 0 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ showAmountDesc: !this.state.showAmountDesc });
                                  }}
                                >
                                  <View style={{ flexDirection: 'row' }}>
                                    <View
                                      style={{
                                        backgroundColor: colors.blue2,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 35,
                                        width: 35,
                                        marginRight: 10,
                                        borderRadius: 17,
                                      }}
                                    >
                                      <Image
                                        source={awardIcon}
                                        style={{
                                          width: 20,
                                          height: 20,
                                          resizeMode: 'cover',
                                        }}
                                      />
                                    </View>
                                    <Text
                                      style={{
                                        fontFamily: 'MontserratRegular',
                                        fontSize: 22,
                                      }}
                                    >
                                      {challenge.awardAmount}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              ) : null}
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                if (store.showOldAwards && parseInt(item.awardEnd) < new Date().getTime()) {
                                  return;
                                }

                                Alert.alert(
                                  '',
                                  store.showOldAwards ? 'Вы действительно НЕ использовали код и отметили его по ошибке?' : 'Вы действительно использовали код?',
                                  [
                                    {
                                      text: 'Нет',
                                      onPress: () => {},
                                      style: 'cancel',
                                    },
                                    {
                                      text: 'Да',
                                      onPress: async () => {
                                        console.log('loading begin');
                                        await store.useApplication(item.id, store.showOldAwards);
                                        await store.loadData();
                                        awards = store.showOldAwards ? store.usedAwards : store.awards;
                                        console.log('loading end', store.usedAwards);
                                        this.forceUpdate();
                                      },
                                    },
                                  ],
                                  { cancelable: true },
                                );
                              }}
                              style={{
                                ...styles.bodyFrame,
                                backgroundColor: store.showOldAwards && parseInt(item.awardEnd) < new Date().getTime() ? colors.textGray : colors.blue,
                                borderRadius: 8,
                                top: 15,
                                right: 15,
                              }}
                              disabled={store.showOldAwards && parseInt(item.awardEnd) < new Date().getTime()}
                            >
                              <Text
                                style={{
                                  color: 'white',
                                  textAlign: 'center',
                                }}
                              >
                                {!store.showOldAwards ? 'Не использовано' : 'Уже использовал'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          {this.state.showAmountDesc ? (
                            <View
                              style={{
                                height: 40,
                                paddingHorizontal: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: 'MontserratRegular',
                                  fontSize: 18,
                                }}
                              >
                                {challenge.awardDescription}
                              </Text>
                            </View>
                          ) : null}
                      </View>
                      )
                    }}
                    data={store.showOldAwards ? store.usedAwards : store.awards.slice().filter((item) =>
                                {
                                    return (item.promoViewType.length > 2) ? true: false;
                                })}
                    extraData={store}
                    onRefresh={async () => {
                      this.setState({refreshing: true}, store.loadData.then(()=> this.setState({refreshing: false})))
                      
                      console.warn("refreshing")
                    }}
                    refreshing={this.state.refreshing}
                  />
                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showCodeModal}
                    onRequestClose={() => {
                      this._showCodeModal(false, null);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          paddingHorizontal: 15,
                          paddingTop: Constants.statusBarHeight,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: 50,
                            height: 50,
                            backgroundColor: colors.main,
                            padding: 5,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            this._showCodeModal(false, null);
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'MontserratRegular',
                              fontSize: 18,
                              color: 'white',
                              textAlign: 'center',
                            }}
                          >
                            X
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>{this._renderPromoCodeModalBody()}</View>
                    </View>
                  </Modal>
                </View>
              ) : (
                <Text style={[styles.headerTitle, { marginTop: 20, color: colors.gray }]}>У меня пока нет наград</Text>
              )}
            </View>
          </View>
        ) : null} */}
        <Toast ref="toast" position="top" />
        
        {store.currentTab == 'list' ? (
          <View style={styles.accountLayout}>
            <View style={styles.settingsHeader}> 
              <TouchableOpacity
                // onPress={() => {navigate('MyProfile')
                //                 store.pendingType = 'moderation'}}
              >
                <Image
                  source={require('../assets/images/tab-profile-off.png')}
                  style={styles.tabIcon}
                />
              </TouchableOpacity>

              <View style={{ flex: 1 }} />
                
              <TouchableOpacity 
                // onPress={() => {navigate('Balance')}}
                style={[styles.feedMenuItem, styles.feedMenuItemActive]}       //CHECK 
              >
                <Image source={require('../assets/images/coins.png')} 
                  style={[styles.tabIcon, {tintColor: colors.white}]} />
                <Text style={styles.feedMenuItemText}>
                  {store.balance}
                </Text>
              </TouchableOpacity>

              <View style={{ flex: 1 }} />

              <TouchableOpacity
                // onPress={() => {store.currentTab = 'fav'}}
              >
                  <Image source={store.currentTab == 'fav' 
                    ? require('../assets/images/cup-on.png')
                    : require('../assets/images/cup.png')}
                    style={styles.tabIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.wrapper}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 70,
                }}
                windowSize={3}
                renderItem={ (item) => {
                  // if (
                  //   item.hideInList ||
                  //   (store.showOldChallenges && parseInt(item.end) > new Date().getTime()) ||
                  //   (!store.showOldChallenges && parseInt(item.end) < new Date().getTime())
                  // ) {
                  //   return <View />;
                  // }

                  // if (!store.firstItem) {
                  //   store.firstItem = item;
                  // }
                  return <ShowChallenge navigate={navigate} item={item.item} isItTiles={false} showFooter={true} showHeader={true} showBody={true} key={item.item.id}/>
                }}
                data={store.challenges.results}              
                onRefresh={async () => {
                  this.setState(
                    {refreshing: true},
                    () => store.loadData()
                      .then(() => 
                        this.setState({refreshing: false})
                      )
                  )
                }}
                refreshing = {this.state.refreshing}
              />
            </View>
          </View>
        ) : null}
      </View>
    )
  }
}




// let filteredChallenges = [];
    // if (store.filtersEnabled || store.filters.tagFilter) {
    //   store.challenges.forEach((item) => {
    //     let filtered = 0;
    //     let filteredCategory1 = 0;
    //     let filteredCategory2 = 0;
    //     let filteredCategory3 = 0;
    //     let filteredCatNumber = 0;
    //     if (store.filters['video'] || store.filters['image']) {
    //       filteredCatNumber++;
    //     }
    //     if (store.filters['complexity1'] || store.filters['complexity2'] || store.filters['complexity3']) {
    //       filteredCatNumber++;
    //     }
    //     if (store.filters['points'] || store.filters['discount'] || store.filters['bonuses'] || store.filters['other']) {
    //       filteredCatNumber++;
    //     }
    //     if (store.filters['video'] && item.type == 'video') {
    //       filtered = 1;
    //       filteredCategory1 = 1;
    //     }
    //     if (store.filters['image'] && item.type != 'video') {
    //       filtered = 1;
    //       filteredCategory1 = 1;
    //     }
    //     if (store.filters['complexity1'] && item.complexity == 0) {
    //       filtered = 1;
    //       filteredCategory2 = 1;
    //     }
    //     if (store.filters['complexity2'] && item.complexity == 5) {
    //       filtered = 1;
    //       filteredCategory2 = 1;
    //     }
    //     if (store.filters['complexity3'] && item.complexity == 10) {
    //       filtered = 1;
    //       filteredCategory2 = 1;
    //     }
    //     if (store.filters['points'] && item.awardSum > 0) {
    //       filtered = 1;
    //       filteredCategory3 = 1;
    //     }
    //     if (store.filters['discount'] && item.awardType == 'discount') {
    //       filtered = 1;
    //       filteredCategory3 = 1;
    //     }
    //     if (store.filters['bonuses'] && item.awardType == 'bonus') {
    //       filtered = 1;
    //       filteredCategory3 = 1;
    //     }
    //     if (store.filters['other'] && item.awardType == 'other') {
    //       filtered = 1;
    //       filteredCategory3 = 1;
    //     }

    //     if (filteredCatNumber != filteredCategory1 + filteredCategory2 + filteredCategory3) {
    //       filtered = 0;
    //     }
    //     if (item.categories && item.categories.length) {
    //       item.categories.forEach((cat) => {
    //         if (store.filters[cat]) {
    //           filtered = 1;
    //         }
    //       });
    //     }
    //     if (!filtered && store.filters.tagFilter && item.tags.indexOf(store.filters.tagFilter) > -1) {
    //       filtered = 1;
    //     }
    //     if (filtered) {
    //       filteredChallenges.push(item);
    //     }
    //   });
    // }