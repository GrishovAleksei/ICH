import React from 'react';
import styles, {colors} from '../styles/index';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import {observer} from 'mobx-react';
// import {NavigationActions, StackActions} from "react-navigation";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../stores/AppStore'

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class SignIn extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props){
    super(props)
    this.state={
      hidePassword: true,
      currentField: 'signInEmail',
      email: '',
      password: '',
    }
  }

  render() {
    const p = this.props;
    const {navigate, goBack} = p.navigation;
    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          {<TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon}/>
          </TouchableOpacity>}
          <View style={{flex: 1}}></View>
          <Text style={styles.headerTitle}>{store.messages.signUpHeader}</Text>
          <View style={{flex: 1, marginRight: 36}}></View>
        </View>

        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={[styles.formAuth,
            this.state.currentField == "signUpEmail"
            ? styles.formAuthActive : null]}
          >
            <TextInput
              style={styles.formAuthValue}
              placeholder={store.messages.email}
              keyboardType={'email-address'}
              autoFocus={true}
              onFocus={(e) => {
                this.setState({currentField: "signUpEmail"})
              }}
              onBlur={(e) => {
               this.setState({currentField: null})
              }}
              onChangeText={(email) => {
                this.setState({email})
              }}
              value={this.state.email}
            />
          </View>
          <View style={[styles.formAuth,
           this.state.currentField == "signUpPassword"? styles.formAuthActive : null]}
          >
            <View style={{paddingHorizontal:25,
                        flexDirection:'row'}}
            >
              <TextInput
                style={styles.formAuthValue}
                placeholder={store.messages.password}
                onFocus={(e) => {
                 this.setState({currentField: "signUpPassword"})
                }}
                onBlur={(e) => {
                  this.setState({currentField: null})
                }}
                onChangeText={(password) => {
                  this.setState({password})
                }}
                value={this.state.password}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={this.state.hidePassword}
                blurOnSubmit={true}
              />
              <Icon
                style={{
                  paddingTop:5,
                  paddingHorizontal:10
                }}
                name={this.state.hidePassword ? 'visibility-off' : 'visibility'}
                size={25}
                onPress={() => {
                  this.setState({ hidePassword: !this.state.hidePassword })
                }}
              />
            </View>
          </View>
          
          <TouchableOpacity
            onPress={async () => {
              if (validateEmail(this.state.email) && this.state.password.length > 5) {
                store.loading = true
                let result = await store.apiCall('customer-signup', {
                  name: '',
                  surname: '',
                  birthday: '1970-01-01',
                  email: this.state.email,
                  password: this.state.password
                })
                if (!result.success) {
                  this.refs['toast'].show(result.errorMessage, 2000)
                } else {
                  let result = await store.apiCall('auth-customer', {
                    email: this.state.email,
                    password: this.state.password
                  })
                  if (!result.success) {
                    this.refs['toast'].show(result.errorMessage, 2000)
                  } else {
                    await store.saveJWT(result.data['jwt']);
                    await store.loadData();
                    p.navigation.reset({
                      index: 0,
                      routes: [{name: "Account"}]
                    })
                    
                  }
                }
                store.loading = false
              } else {
                this.refs['toast'].show(store.messages.inputParametters, 2000)
              }
            }}
          >
            <View
              style={{...styles.button, 
                      backgroundColor: validateEmail(this.state.email) && this.state.password.length > 5 ? colors.orange : colors.lightGray
                      }}
            >
              <Text
                style={{...styles.buttonText,
                        color: validateEmail(this.state.email) && this.state.password.length > 5 ? colors.white : colors.black}}>
                {store.messages.signUp}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
            <View style={styles.frontSignInButton}>
              <Text style={styles.frontSignInButtonText}>{store.messages.frontSignIn}</Text>
            </View>
          </TouchableOpacity>
          <KeyboardSpacer/>
        </ScrollView>
        <Toast ref="toast" position='top'/>
      </View>
    )
  }
}
