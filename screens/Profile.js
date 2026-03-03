import React from 'react';
import styles, {colors} from '../styles/index';
import {Dimensions, FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, TouchableWithoutFeedback} from 'react-native';
import {observer} from 'mobx-react';
import {Video} from 'expo-av';
import {HeaderDropDownMenu} from '../components/HeaderItems/HeaderDropDownMenu';
import Toast from "react-native-easy-toast";
import TypeButtons from '../components/TypeButtons'
import { withStore } from '../stores/AppStore'
import ShowChallenge from '../components/ShowChallenge'
import Preview from '../components/Preview'
const {width} = Dimensions.get('window');

@withStore
@observer
export default class Profile extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const p = this.props;
    const {navigate, goBack} = p.navigation;
    const store = p.store;
    const customer = store.customers.find(({id}) => id == store.currentCustomer.id);
    const applications = customer.applications
      .filter(app => ( app.data.status == 'won' ))

    return (
    <View style={styles.accountLayout}>
      <View style={styles.settingsHeader}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}></View>
        <Text style={styles.headerTitle}>Профиль пользователя</Text>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <HeaderDropDownMenu store={store}
                              customerId={customer.id}
                              isBlocked={customer.is_self_blocked}
                              isShowBlockButton={store.currentCustomer.is_show_block_button}
                              resCallback={(message) => {
                                this.refs['toast'].show(message, 5000);
                              }}/>
        </View>
      </View>
      <Toast ref="toast" position='top'/>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={{marginVertical: 15,
                        paddingHorizontal: 15}}>
              <View style={styles.settingsAvatar}>
                <View style={styles.avatar}>
                  {store.currentCustomer.avatar &&
                  <ImageBackground 
                    source={{uri: (store.serverUrl + '/uploads' + store.currentCustomer.avatar)}} 
                    style={styles.image}>
                  </ImageBackground>}
                </View>
              </View>
              <Text style={{
                fontFamily: 'MontserratBold',
                textAlign: 'center',
                width: '100%',
                fontSize: 18,
                color: colors.main,
                marginBottom: 10
              }}>{store.currentCustomer.name}</Text>
            </View>
            <Text style={{
                paddingLeft: 15,
                marginTop: 20,
                marginBottom: 10,
                width: '100%',
                fontSize: 18,
                color: colors.main
              }}
            >
              Выполненные челленджи
            </Text>
            <TypeButtons/> 
          </>
        }

        key={'user-applications-' + store.renderType}
        numColumns={ 
          store.renderType  == 'tiles' ? 3 : 1
        }
        columnWrapperStyle={
          store.renderType == 'tiles'
          ? { 
              width: '100%',
              aspectRatio: 3,
            }
          : undefined
        }
        horizontal={false}
        windowSize={5}
        contentContainerStyle={{ width:width,
          justifyContent: 'space-between' }}
        data={applications}
        renderItem = { application => 
          <Preview application={application.item.data} 
          navigate={navigate}  key={application.index}
          isItTiles={store.renderType == 'tiles'}/>
        }
        ListEmptyComponent={
          <Text
            style={{
              padding: 15,
              marginBottom: 15,
              color: colors.textGray,
              textAlign: 'center'
            }}
          >
            У пользователя еще нет выполненных челленджей
          </Text>
        }

      />
    </View>
    )
  }
}


// let w = width / 3 - 2;
// let item = el.item.data
// let challenge = store.get('challenges', item.challenge)
// if(store.challengeBrandType == 'tiles'){
//   return (
//     <TouchableWithoutFeedback
//       onPress={() => {
//         store.currentChallenge = challenge
//         navigate('Challenge')
//       }}

//       style={{}}
//     >
//       <View style={{ width: w, height: w, margin: 1, position: 'relative' }}>
//         {!item.isVideo
//           ? <Video
//               source={{ uri: store.serverUrl + '/uploads' + item.attachment }}
//               rate={1.0}
//               volume={1.0}
//               isMuted={true}
//               resizeMode="cover"
//               shouldPlay
//               isLooping
//               style={styles.challengeImage} 
//             />
//           : <Image source={{uri:store.serverUrl +'/uploads'+item.attachment}}  
//               style={styles.challengeImage} 
//             />
//         }
//         <Text
//           style={{
//             fontFamily: 'MontserratLight',
//             color: colors.white,
//             fontSize: 12,
//             position: 'absolute',
//             bottom: 5,
//             left: 5,
//             paddingRight: 5,
//           }}
//         > 
//           {challenge.title}
//         </Text>
//       </View>
//     </TouchableWithoutFeedback>
//   )
// }
// else return ( 
//   <TouchableWithoutFeedback
//     onPress={() => {
//       store.currentChallenge = challenge;
//       navigate('Challenge');
//     }}
//   > 
//     <View style={{...styles.sortListSlide, marginBottom: 20}}>
//       {!item.isVideo
//         ? <Video
//             source={{ uri: store.serverUrl + '/uploads' + item.attachment }}
//             resizeMode="cover"
//             rate={1.0}
//             volume={1.0}
//             isMuted={store.soundEnabled[item.id] ? false : true}
//             shouldPlay
//             isLooping
//             style={styles.challengeImage}
//           />
//         : <Image
//             source={{ uri: store.serverUrl + '/uploads' + item.attachment }}
//             style={styles.challengeImage}
//           />
//       }
//        <Text
//           style={{
//             fontFamily: 'MontserratLight',
//             color: colors.white,
//             fontSize: 12,
//             position: 'absolute',
//             bottom: 5,
//             left: 5,
//             paddingRight: 5,
//           }}
//         > 
//           {challenge.title}
//         </Text>
//     </View>
//   </TouchableWithoutFeedback>
// )