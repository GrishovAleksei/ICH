import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, Picker } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withStore } from '../stores/AppStore';

@withStore
@observer
export default class SignIn extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props){
    super(props)
    this.state={
      currentField: null,
    }
}

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;

    let isValid = false;
    if (store['email'] != '') {
      isValid = true;
    }

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>Восстановление пароля</Text>
          <View style={{ flex: 1, marginRight: 36 }}></View>
        </View>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={[styles.formAuth,
            this.state.currentField == "signUpEmail"
              ? styles.formAuthActive : null]}>
            <TextInput
              placeholder={store.messages.email}
              keyboardType={'email-address'}
              autoFocus={true}
              
              onFocus={(e) => {
                this.setState({currentField: "signUpEmail"})
              }}
              onBlur={(e) => {
               this.setState({currentField: null})
              }}
              style={styles.formAuthValue}
              onChangeText={(e) => {
                store['email'] = e;
              }}
              value={store['email']}
            />
          </View>
          <TouchableOpacity
            onPress={async () => {
              if (isValid) {
                store.loading = true;
                let result = await store.apiCall('customer-forgot-password', {
                  email: store['email'],
                });
                if (!result.error) {
                  if (!result.success) {
                    store.loading = false;

                    if (result.errorMessage) {
                      this.refs['toast'].show(result.errorMessage, 2000);
                    } else {
                      this.refs['toast'].show('Ошибка сервера', 2000);
                    }
                  } else {
                    store.loading = false;
                    this.refs['toast'].show('На ваш e-mail было выслано письмо с дальнейшими инструкциями', 3000);
                    setTimeout(function () {
                      // p.navigation.dispatch(
                      //   StackActions.reset({
                      //     index: 0,
                      //     actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
                      //   }),
                      // );
                      p.navigation.reset({
                        index: 0,
                        actions: [{name: "SignIn"}]
                      })
                    }, 3000);
                  }
                } else {
                  store.loading = false;
                  if (result.error) {
                    this.refs['toast'].show(result.error, 2000);
                  } else {
                    this.refs['toast'].show('Ошибка сервера', 2000);
                  }
                }
              } else {
                if (!store.email) {
                  this.refs['toast'].show('Введите e-mail', 2000);
                }
              }
            }}
          >
            <View
              style={{...styles.button, 
                      backgroundColor: isValid ? colors.orange : colors.lightGray
                      }}
            >
              <Text style={{...styles.buttonText, color: isValid
                ? colors.white : colors.black}}>
                  Восстановить пароль
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
            <View style={styles.frontSignInButton}>
              <Text style={styles.frontSignInButtonText}>{store.messages.frontSignIn}</Text>
            </View>
          </TouchableOpacity>
          <KeyboardSpacer />
        </ScrollView>
        <Toast ref="toast" position="top"/>
      </View>
    )
  }
}
