import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, ImageBackground, ScrollView, FlatList, Image, Share } from 'react-native';
import { observer } from 'mobx-react';
import { FontAwesome5 } from '@expo/vector-icons';

@observer
export default class Settings extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      accountLoaded: false,
    };
  }

  async componentDidMount() {
    const store = this.props.screenProps;
    this.setState({
      accountLoaded: true,
    });
  }

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.screenProps;
    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            onPress={() => {
              store['email'] = '';
              store['password'] = '';
              store['name'] = '';
              store.removeJWT();
              this.props.navigation.navigate('Front');
            }}
          >
            <Text>{store.messages.logout} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsAvatar}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              marginBottom: 40,
              borderRadius: 150,
              borderWidth: 1,
              borderColor: '#aaa',
              backgroundColor: '#fafafa',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigate('Avatar')}
          >
            {store.avatar && (
              <ImageBackground
                source={{ uri: store.avatar }}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{ borderRadius: 150 }}
              ></ImageBackground>
            )}

            {!store.avatar && (
              <Text
                style={[
                  {
                    fontSize: 20,
                    color: '#aaa',
                  },
                ]}
              >
                +
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.settingsContent}>
          <ScrollView style={styles.settingsPersonalBlock}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Ваш баланс: {store.balance} баллов</Text>
            <TouchableOpacity onPress={() => (store.showTransactions = true)}>
              <View style={[styles.button, { marginBottom: 20 }]}>
                <Text style={styles.buttonText}>Показать транзакции</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.settingsPersonalItem}>
              <Text style={styles.settingsPersonalLabel}>{store.messages.name}</Text>
              <Text style={styles.settingsPersonalValue}>{store.name}</Text>
            </View>
            <View style={styles.settingsPersonalItem}>
              <Text style={styles.settingsPersonalLabel}>{store.messages.email}</Text>
              <Text style={styles.settingsPersonalValue}>{store.email}</Text>
            </View>
          </ScrollView>
        </View>
        {store.showTransactions ? (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              bottom: 0,
              zIndex: 500,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                position: 'relative',
                width: '80%',
                height: '80%',
                borderRadius: 6,
                backgroundColor: 'white',
              }}
            >
              <TouchableOpacity
                style={{
                  zIndex: 500,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}
                onPress={() => {
                  store.showTransactions = null;
                }}
              >
                <FontAwesome5
                  name="times-circle"
                  style={{
                    fontSize: 30,
                    color: '#CDCDCD',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 60,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      paddingLeft: 20,
                      textAlign: 'center',
                      fontSize: 15,
                    },
                  ]}
                >
                  Транзакции
                </Text>
              </View>

              <FlatList
                data={store.transactions}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      backgroundColor: 'white',
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(0,0,0,0.1)',
                    }}
                    key={item.id}
                  >
                    <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                    <Text style={{ fontSize: 20 }}>{item.amount} баллов</Text>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
