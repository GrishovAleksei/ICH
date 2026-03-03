import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import Toast from 'react-native-easy-toast';
import { observer } from 'mobx-react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {withStore} from '../stores/AppStore'
import dayjs from 'dayjs';

@withStore
@observer
export default class SignIn extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }
  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;

    let isValid = false;
    if (store['email'] != '' && store['password'] != '') {
      isValid = true;
    }

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>{store.messages.balanceHeader}</Text>
          <View style={{ flex: 1, marginRight: 50 }}></View>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
          }}
          contentContainerStyle={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 10,
            paddingHorizontal: 0,
            width: '100%',
            flex: 1,
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: colors.orangeDark,
              paddingHorizontal: 20,
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 22,
              }}
            >
              {store.balance} М
            </Text>
            {/*<TouchableOpacity
                        onPress={async () => {}}>
                        <View style={[styles.button, styles.buttonWhite]}>
                            <Text  style={styles.buttonWhiteText}>{store.messages.addBalance}</Text>
                        </View>
                    </TouchableOpacity>*/}
          </View>
          <FlatList
            data={store.transactions}
            style={{
              flex: 1,
              width: '100%',
            }}
            renderItem={({ item }) => {
              if (!item.amount) return <View />;
              return (
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'column',
                      maxWidth: '60%',
                    }}
                    key={item.id}
                  >
                    <Text style={{ fontSize: 14, color: colors.main }}>{item.comment.replace('баллов', 'монет')}</Text>
                    <Text style={{ fontSize: 14, color: colors.textGray }}>{dayjs(new Date(parseInt(item.date * 1000))).format('DD.MM.YY HH:mm')}</Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      maxWidth: '40%',
                      fontFamily: 'MontserratSemiBold',
                      color:
                        item.amount > 0 && item.to_type == 'customer'
                          ? colors.green
                          : item.amount > 0 && item.from_type == 'customer'
                          ? colors.red
                          : item.amount > 0
                          ? colors.orange
                          : colors.red,
                    }}
                  >
                    {item.amount > 0 && item.to_type == 'customer' ? '+' : ''}
                    {item.amount > 0 && item.from_type == 'customer' ? '-' : ''}
                    {item.amount}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Toast ref="toast" position="top" />
      </View>
    );
  }
}
