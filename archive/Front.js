import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, Image } from 'react-native';

export default class Front extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const p = this.props;
    const { navigate } = p.navigation;
    const store = p.screenProps;
    return (
      <View style={styles.frontLayout}>
        <Image source={require('../assets/images/logo.png')} style={styles.frontLogo} />
        <Text style={styles.frontMessage}>{store.messages.frontMessage}</Text>
        <View
          style={{
            flex: 1,
          }}
        ></View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
          <View style={styles.frontButton}>
            <Text style={styles.frontButtonText}>{store.messages.frontButton}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 40,
          }}
        ></View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text>{store.messages.frontAlreadyAccount}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
            <View style={styles.frontSignInButton}>
              <Text style={styles.frontSignInButtonText}>{store.messages.frontSignIn}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
