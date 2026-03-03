import React from 'react';
import styles, {colors} from '../styles/index';
import {Dimensions, FlatList, Image, ImageBackground, TextInput, Text, TouchableOpacity, View, Alert } from 'react-native'
import CheckBox from 'react-native-check-box'
import {observer} from 'mobx-react';
import StatusButtons from '../components/PendingButtons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Preview from '../components/Preview'
// import FeedBackModal from '../components/FeedBackModal'
// import { NavigationActions, StackActions } from 'react-navigation';
import { withStore } from '../stores/AppStore'
const {width} = Dimensions.get('window');

@withStore
@observer
export default class MyProfile extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     showFeedBackModal: false
  //   }
  // }
  
  render() {
    const p = this.props;
    const {navigate, goBack} = p.navigation;
    const store = p.store;
    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => {
            store.profileEditable = false
            goBack()}}
          >
            <Image source={require('../assets/images/back.png')} 
                  style={styles.backIcon} />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }} />
          <Text style={styles.headerTitle}>Мой профиль</Text>
          <View style={{ flex: 1 }} />
          
          <TouchableOpacity
            onPress={() => this.setState({ showFeedBackModal: true })}
          >
            <Image source={require('../assets/images/comment.png')} 
              style={styles.tabIcon}/>
          </TouchableOpacity>
        </View>

        {/* <FeedBackModal show={this.state.showFeedBackModal} 
          close={() => this.setState({ showFeedBackModal: false})}
        /> */}

        <FlatList
          ListHeaderComponent={
          <>
            <View style={{marginVertical: 15,
                        paddingHorizontal: 15}}>
              <View style={styles.settingsAvatar}>
                <TouchableOpacity
                  style={styles.avatar}
                  onPress={() => navigate('Avatar')}
                >
                  {store.avatar
                  ? <ImageBackground
                      source={{ uri: store.avatar.indexOf('http') > -1 
                        ? store.avatar 
                        : store.serverUrl + '/uploads' + store.avatar }}
                      style={styles.image}/>
                  : <View style={{
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      overflow: 'hidden',
                      left: 35.335,
                      top: 35.335,
                      backgroundColor: colors.blue,
                    }}>
                      <Text
                        style={{
                          fontSize: 19,
                          color: colors.white,
                          textAlign: 'center',
                        }}
                      > + </Text>
                    </View>
                  }
                </TouchableOpacity>
              </View>
              
              {!store.verifiedEmail
                ? <Text style={{ textAlign: 'center'}}>
                    Вам необходимо подтвердить адрес электронной почты. Проследуйте по ссылке в письме для подверждения адреса.
                  </Text>
                : null
              }

              {store.profileEditable 
              ? <View style={{alignItems: 'center',
                              paddingVertical: 10}}>
                  <View>
                    <View style={styles.formItem}>
                      <Text style={styles.formLabel}>
                        {store.messages.nick}:
                      </Text> 
                      
                      <TextInput
                        placeholder={store.messages.nick}
                        style={styles.formValue}
                        maxLength={20}
                        onFocus={(e) => {
                          store.currentField = 'signUpNick';
                        }}
                        onBlur={(e) => {
                          store.currentField = null;
                        }}
                        onChangeText={(e) => {
                          store['nick'] = e;
                        }}
                        value={store['nick']}
                      />
                    </View>
                  
                    <View style={styles.formItem}>
                      <Text style={styles.formLabel}>
                        {store.messages.name}:
                      </Text>
                    
                      <TextInput
                        placeholder={store.messages.name}
                        style={styles.formValue}
                        maxLength={20}
                        onFocus={(e) => {
                          store.currentField = 'signUpName';
                        }}
                        onBlur={(e) => {
                          store.currentField = null;
                        }}
                        onChangeText={(e) => {
                          /*e = e.replace(/[^а-яА-Я\-0-9]/gi, '');*/
                          store['name'] = e;
                        }}
                        value={store['name']}
                      />
                    </View>

                    <View style={styles.formItem}>
                      <Text style={styles.formLabel}>
                        {store.messages.age}:
                      </Text>
                      
                      <TextInput
                        placeholder={store.messages.age}
                        keyboardType="number-pad"
                        style={styles.formValue}
                        onFocus={(e) => {
                          store.currentField = 'signUpAge';
                        }}
                        onBlur={(e) => {
                          store.currentField = null;
                        }}
                        onChangeText={(e) => {
                          if (e > 0) {
                            if (!isNaN(parseInt(e))) {
                              if (e < 100) {
                                store['age'] = parseInt(e);
                              } else {
                                store['age'] = 99;
                              }
                            }
                          } else {
                            store['age'] = '';
                          }
                        }}
                        value={store['age'].toString()}
                      />
                    </View>

                    <View style={styles.formItem}>
                      <Text style={styles.formLabel}>Пол:</Text>
                      <View
                        style={{
                          flex: 2,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <CheckBox
                          style={{ flex: 0.3, padding: 10 }}
                          onClick={() => {
                            store.gender = 'm';
                          }}
                          isChecked={store.gender == 'm'}
                          rightText={'М'}
                        />

                        <CheckBox
                          style={{ flex: 0.3, padding: 10 }}
                          onClick={() => {
                            store.gender = 'f';
                          }}
                          isChecked={store.gender == 'f'}
                          rightText={'Ж'}
                        />
                      </View>
                    </View>

                    <View style={styles.formItem}>
                      <Text style={styles.formLabel}>
                        {store.messages.email}:
                      </Text>
                      <TextInput
                        placeholder={store.messages.email}
                        style={styles.formValue}
                        maxLength={20}
                        onFocus={(e) => {
                          store.currentField = 'signUpName';
                        }}
                        onBlur={(e) => {
                          store.currentField = null;
                        }}
                        onChangeText={(e) => {
                          store['email'] = e;
                        }}
                        value={store['email']}
                      />
                    </View>
                    <KeyboardSpacer topSpacing={40} />
                  </View>
                
                  <TouchableOpacity 
                    onPress={async () => {
                      let result = await store.apiCall('change-customer', {
                        id: store.userId,
                        fbProfile: store['fbProfile'],
                        name: store['name'],
                        age: store['age'],
                        gender: store['gender'],
                        country: store['country'],
                        city: store['city'],
                        nick: store['nick'],
                        surname: store['surname'],
                        show_self_blocked_content: store.showBlocked,
                      });
                      store.profileEditable = false;
                    }}
                    style={{
                      ...styles.profileButton,
                      backgroundColor: colors.turquoise,
                    }}
                  >
                    <Text style={styles.buttonText}>
                      Сохранить
                    </Text>
                  </TouchableOpacity>
                </View>
                
              : <View style={{alignItems: 'center',
                              paddingVertical: 10}}>
                  <Text
                    style={{
                      fontFamily: 'MontserratSemiBold',
                      textAlign: 'center',
                      width: '100%',
                      fontSize: 18,
                      marginBottom: 10,
                      color: colors.main,
                    }}
                  >
                    {store.nick}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      store.profileEditable = true;
                    }}
                    style={{
                      ...styles.profileButton,
                      backgroundColor: colors.orange
                    }}
                  >
                    <Text style={styles.buttonText}>
                      Редактировать
                    </Text>
                  </TouchableOpacity>
                </View>
              }

            </View>
            <StatusButtons/>
          </>
          }

          numColumns={3}
          data={
            store.pendingType == 'moderation'
              ? store.applications.slice()
              : store.pendingType == 'awards'
                ? store.wins.slice()
                : []
          }
          // initialNumToRender={20}
          windowSize={20}
          horizontal={false}
          contentContainerStyle={{ width: width, justifyContent: 'space-between' }}
          columnWrapperStyle={{ width: '100%',
                                aspectRatio: 3,}}
          renderItem = { application => 
            <Preview application={application.item}
              navigate={navigate} key={application.order}
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
              Здесь еще нет выполненных челленджей
            </Text>
          }

          ListFooterComponent={
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Выход из аккаунта',
                  'Вы действительно хотите выйти?',
                  [
                    {
                      text: 'Нет',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Да',
                      onPress: () => {
                        store['email'] = '';
                        store['password'] = '';
                        store['name'] = '';
                        store.removeJWT();
                        // p.navigation.dispatch(
                        //   StackActions.reset({
                        //     index: 0,
                        //     actions: [NavigationActions.navigate({ routeName: 'Splash' })],
                        //   }),
                        // );
                        p.navigation.reset({
                            index: 0,
                            routes: [{name: "Splash"}]
                        })
                      },
                    },
                  ],
                  { cancelable: true },
                );
              }}
            >
              <View style={styles.frontSignInButton}>
                <Text style={styles.frontSignInButtonText}>
                  Выйти из аккаунта
                </Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}