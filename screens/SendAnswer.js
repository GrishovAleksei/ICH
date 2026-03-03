import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, TextInput, Keyboard, ScrollView, Image, Share, Dimensions } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
// import { NavigationActions, StackActions } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import dayjs from 'dayjs';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');
import CheckBox from 'react-native-check-box';
import { withStore } from '../stores/AppStore';

@withStore
@observer
export default class SendAnswer extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;
    const questions = store.currentChallenge.questions.split(/\r?\n/);

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>Отправить заявку</Text>
          <View style={{ flex: 1, marginRight: 100 }}></View>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 15,
            width: '100%',
            flex: 1,
          }}
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps={'handled'}
        >
          <TouchableOpacity
            onPress={async () => {
              store.loading = true;
              let result = await store.apiCall('send-answer', {
                challenge: store.currentChallenge.id,
                answer: store['applicationAnswer'],
                type: store.currentChallenge.testFormat,
              });
              store.loading = false;
              if (result) store.loadData();
              // this.navigator &&
              // this.navigator.dispatch(
              //   StackActions.reset({
              //     index: 0,
              //     actions: [NavigationActions.navigate({ routeName: 'Account' })],
              //   }),
              // )
              p.navigation.reset({
                index: 0,
                routes: [{name: "Account"}]
              })
            }}
          >
            <View style={[styles.button, { marginVertical: 30 }]}>
              <Text style={styles.buttonText}>Отправить</Text>
            </View>
          </TouchableOpacity>

          {store.currentChallenge.testFormat == 'text' ? (
            <View>
              <View style={{ marginVertical: 20 }}>
                <Text>{questions[0]}</Text>
              </View>
              <View style={styles.formItem}>
                {store.currentField == 'applicationAnswer' ? <Text style={styles.formLabel}>Ответ</Text> : null}
                <TextInput
                  multiline={true}
                  placeholder="Ответ"
                  autoFocus={true}
                  style={styles.formValue}
                  onFocus={(e) => {
                    store.currentField = 'applicationAnswer';
                  }}
                  onBlur={(e) => {
                    store.currentField = null;
                  }}
                  onChangeText={(e) => {
                    store['applicationAnswer'] = e;
                  }}
                  value={store['applicationAnswer']}
                />
              </View>
            </View>
          ) : store.currentChallenge.testFormat == 'checkbox' ? (
            <View>
              <View>
                {questions.map((el, i) => (
                  <CheckBox
                    key={'answer' + i}
                    style={{ paddingVertical: 5 }}
                    onClick={() => {
                      if (typeof store.applicationAnswer != 'object') {
                        store.applicationAnswer = [];
                      }
                      if (store.applicationAnswer.indexOf(el) == -1) {
                        store.applicationAnswer.push(el);
                      } else {
                        store.applicationAnswer.splice(store.applicationAnswer.indexOf(el), 1);
                      }
                    }}
                    isChecked={store.applicationAnswer.indexOf(el) > -1}
                    rightText={el}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View>
              <View>
                {questions.map((el, i) => (
                  <CheckBox
                    key={'answer' + i}
                    onClick={() => {
                      store.applicationAnswer = [i];
                    }}
                    isChecked={store.applicationAnswer.indexOf(i) > -1}
                    rightText={el}
                  />
                ))}
              </View>
            </View>
          )}
          <KeyboardSpacer topSpacing={100} />
        </ScrollView>
        <Toast ref="toast" position="top" />
      </View>
    );
  }
}
