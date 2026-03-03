import React from 'react';
import styles,{colors} from '../styles/index';
import { Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView, Image } from 'react-native';
import Toast from 'react-native-easy-toast';
import {observer} from 'mobx-react';
import {observable, action} from 'mobx'
// import {NavigationActions, StackActions} from "react-navigation";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../stores/AppStore'

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidePassword: true,
            currentField: 'signInEmail',
            email: '',
            password: '',
        }
    }

    render() {
        const p = this.props;
        const { navigate, goBack } = p.navigation;
        return (
            <View style={styles.accountLayout}>
                <View style={styles.settingsHeader}>
                    {/* {p.navigation.isFirstRouteInParent() ? null : <TouchableOpacity onPress={() => goBack()}>
                        <Image source={require('../assets/images/back.png')} style={styles.backIcon}/>
                    </TouchableOpacity>} */}
                    <View style={{flex: 1}}></View>
                    <Text style={styles.headerTitle}>{store.messages.signInHeader}</Text>
                    <View style={{flex: 1,
                         marginRight: 0}}></View>
                </View>
                <Toast  ref="toast"
                        position='top'/>
                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={[styles.formAuth,
                        this.state.currentField == "signInEmail"
                            ? styles.formAuthActive : null]}>
                        <TextInput
                            style={styles.formAuthValue}
                            keyboardType={'email-address'}
                            placeholder={store.messages.email}
                            onFocus={(e) => {
                                this.setState({currentField: "signInEmail"})
                            }}
                            onBlur={(e) => {
                                this.setState({currentField: null})
                            }}
                            autoFocus = {true}
                            onChangeText={email =>{
                                this.setState({email})
                            }}
                            value={this.state.email}
                        />
                    </View>
                    <View style={[styles.formAuth,
                        this.state.currentField == "signInPassword" 
                        ? styles.formAuthActive : null]}>
                        <View style={{paddingHorizontal:25,
                            flexDirection:'row'}}>
                            <TextInput
                                style={styles.formAuthValue}
                                placeholder={store.messages.password}

                                onFocus={(e) => {
                                    this.setState({currentField: "signInPassword"})
                                }}
                                onBlur={(e) => {
                                    this.setState({currentField: null})
                                }}
                                onChangeText={password => {
                                    this.setState({password});
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
                                name={this.state.hidePassword ?'visibility-off' : 'visibility'}
                                size={25}
                                onPress={() => {
                                this.setState({ hidePassword: !this.state.hidePassword })
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => store.auth
                            ({
                                // username: this.state.email,
                                // password: this.state.password,
                                username: "sal",
                                password: "gesundheit",
                            })
                        }

                        // onPress={async () => {
                        //     // if (validateEmail(this.state.email) && this.state.password.length > 5) {
                        //     //     store.loading = true
                        //         try {
                        //             let result = await store.apiCall
                        //             ('/api/token/',{
                        //                 username: this.state.email,
                        //                 password: this.state.password,
                        //             });
                        //             console.log(result)
                        //             if (!result.success) {
                        //                 this.refs['toast'].show(result.errorMessage, 2000);
                        //             } else {
                        //                 await store.saveJWT(result.data['jwt']);
                        //                 await store.loadData();
                        //                 p.navigation.reset({
                        //                     index: 0,
                        //                     routes: [{name: "AccountWrapper"}]
                        //                 })
                        //                 store.loading = false
                        //                 return
                        //             }
                        //         } catch(e) {
                        //              console.log(e)
                        //         }
                        //         store.loading = false
                        //     // } else { 
                        //     //     this.refs['toast'].show(store.messages.allFieldsRequired, 2000)
                        //     // }
                        // }}
                    >
                        <View
                            style={{...styles.button, 
                                backgroundColor: validateEmail(this.state.email) && this.state.password.length > 5 ? colors.orange : colors.lightGray
                                }}
                        >
                            <Text
                                style={{...styles.buttonText,
                                        color: validateEmail(this.state.email) && this.state.password.length > 5 ? colors.white : colors.black}}>
                                {store.messages.frontSignIn}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <View style={styles.frontSignInButton}>
                            <Text style={styles.frontSignInButtonText}>{store.messages.frontButton}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <View style={styles.frontSignInButton}>
                            <Text style={styles.frontSignInButtonText}>Забыли пароль?</Text>
                        </View>
                    </TouchableOpacity>
                    <KeyboardSpacer topSpacing={40}/>
                </ScrollView>
            </View>
        )
    }
}
