import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import { observer } from 'mobx-react';
import { Linking } from 'expo';
import { FlatList } from 'react-native-gesture-handler';
import ShowChallenge from '../components/ShowChallenge'
import TypeButtons from '../components/TypeButtons'
import Constants from 'expo-constants';
import {withStore} from '../stores/AppStore'
const { width } = Dimensions.get('window')
import { store } from '../stores/AppStore'

@withStore
@observer
export default class Brand extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  item = store.get('brands', store.currentBrand);


  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    
    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>Профиль бренда</Text>
          <View style={{ flex: 1, marginRight: 32 }}></View>
        </View>
        <FlatList
          ListHeaderComponent={
          <>
            <View style={styles.settingsAvatar}>
              <View
                style={{
                  height: 150,
                  width: 300,
                  marginBottom: 10,
                  borderRadius: 2,
                  borderWidth: 0,
                  borderColor: '#aaa00',
                  backgroundColor: '#fafafa00',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ImageBackground
                  source={{ uri: store.serverUrl + '/uploads' + this.item.logo }}
                  style={{
                    width: 300,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  imageStyle={{ borderRadius: 2 }}
                  resizeMode='contain'
                ></ImageBackground>
              </View>
              <Text
                style={{...styles.brandInfo,
                  fontSize: 18,
                  fontFamily: 'MontserratSemiBold',
                }}
              >
                {this.item.title}
              </Text>

              {this.item.description ? (
                <Text style={styles.brandInfo}>
                  {this.item.description}
                </Text>
              ) : null}

              {this.item.web ? (
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL((this.item.web.indexOf('https') == -1 ? 'https://' : '') + this.item.web).catch((err) => console.error("Couldn't load page", err));
                  }}
                  style={styles.link}
                >
                  <Text style={styles.linkText}>
                    {this.item.web}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <TypeButtons/>
          </>
          }
          horizontal={false}
          key={'brand-applications-' + store.renderType}
          numColumns={store.renderType == 'tiles' ? 3 : 1}
          contentContainerStyle={{ width: width }}
          columnWrapperStyle={
            store.renderType == 'tiles'
            ? { 
                width: '100%',
                aspectRatio: 3,
              }
            : undefined
          }
          renderItem={({ item }) => {
            return <ShowChallenge store={store} navigate={navigate} item={item} isItTiles={store.renderType == 'tiles'} showFooter={true} showBody={true}/>
          }}
          data={store.challenges.slice().filter((item) => item.brand == store.currentBrand)}
        />
      </View>
      
    )
  }
}



