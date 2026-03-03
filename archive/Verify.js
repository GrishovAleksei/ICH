import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, TextInput, Keyboard, FlatList, Image } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';

@observer
export default class Verify extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  async componentDidMount() {
    const store = this.props.screenProps;
    //console.log('store.phone', store.phone);
    if (store.phone && store.phone != '') {
      await store.apiCall('verify-phone', {
        phone: store.phone,
      });
      store.loading = false;
    }
  }

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.screenProps;

    let isValid = false;
    if (store['verifyCode'] != '') {
      isValid = true;
    }

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => navigate('SignIn')}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>{store.messages.verifyPhoneHeader}</Text>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.formContent}>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>{store.messages.enterVerifyCode}</Text>
            <TextInput
              keyboardType={'number-pad'}
              autoFocus={true}
              style={styles.formValue}
              onChangeText={(e) => {
                store['verifyCode'] = e;
              }}
              value={store['verifyCode']}
            />
          </View>
          <TouchableOpacity
            onPress={async () => {
              if (isValid) {
                store.loading = true;
                let result = await store.apiCall('verify-phone-code', {
                  code: store['verifyCode'],
                });
                store.loading = false;
                if (result.error) {
                  store['verifyCode'] = '';
                  this.refs['toast'].show(JSON.parse(result.error).errorMessage, 2000);
                } else {
                  Keyboard.dismiss();
                  store.verifiedPhone = true;
                  store.loading = false;
                  if (!store.verifiedEmail) {
                    navigate('Account');
                  } else {
                    if (!store.paid) {
                      navigate('OrderPayment');
                    } else {
                      navigate('OrderStep3');
                    }
                  }
                }
              }
            }}
          >
            <View style={[isValid ? styles.button : styles.buttonDisabled, { marginVertical: 20 }]}>
              <Text style={isValid ? styles.buttonText : styles.buttonTextDisabled}>{store.messages.submit}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="top" />
      </View>
    );
  }
}
