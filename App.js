import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { BackHandler, View, Text, Alert } from 'react-native';
import { store, StoreProvider, } from './stores/AppStore';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { StatusBar } from 'expo-status-bar'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-easy-toast';

const Stack = createStackNavigator();


@observer
export default class App extends React.Component {
  
  cacheImages(images) {
    return images.map((image) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  async _loadAssetsAsync() {
    await Font.loadAsync({
      MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
      MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
      MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
      MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),
    });

    setCustomTextInput({
      style: {
        fontFamily: 'MontserratLight',
      },
    });
    setCustomText({
      style: {
        fontFamily: 'MontserratRegular',
      },
    });

    const imageAssets = this.cacheImages([require('./assets/images/logo.png'), require('./assets/images/back.png'), require('./assets/images/settings.png')]);
    await Promise.all([...imageAssets]);
  }
  
  componentDidMount() {
    setInterval(() => {
      fetch('https://api.ichazy.com')
        .catch(error => {
          console.log(error)
          {this.refs['toast'].show('Нет интернет соединения.', 10000)}
        })
    }, 30000);
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isReady: false,
    };
    
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading startAsync={this._loadAssetsAsync.bind(this)} onFinish={() => this.setState({ isReady: true })} onError={console.warn} />;
    }

    return (
    <>
      <StatusBar/>
      <Spinner key="spinner" visible={store.loading} />
      <View style={{flex:1}} key="generalView">        
        <StoreProvider store={store}>
          <Navigation />
        </StoreProvider>
      </View>
      <Toast ref="toast" position="top"/>
    </>
    );
    // return <Text>Testsassdfszxcxzc</Text>
  }
  
}

import Splash from './screens/Splash'
import Account from './screens/Account'
import AccountWrapper from './screens/AccountWrapper'
import Balance from './screens/Balance'
import Avatar from './screens/Avatar'
import Brand from './screens/Brand'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import ForgotPassword from './screens/ForgotPassword'
import Filters from './screens/Filters'
import Challenge from './screens/Challenge'
import CameraPage from './screens/CameraPage'
import SendApplication from './screens/SendApplication'
import SendAnswer from './screens/SendAnswer'
import Profile from './screens/Profile'
import MyApplication from './screens/MyApplication'
import Application from './screens/Application'
import AwardsDetails from './screens/AwardsDetails'
import MyProfile from './screens/MyProfile'
import NoConnection from './screens/NoConnection'

const Navigation = observer(() => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {store.jwt 
      ? <>
          <Stack.Screen name="AccountWrapper" component={AccountWrapper} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Balance" component={Balance} />
          <Stack.Screen name="Avatar" component={Avatar} />
          <Stack.Screen name="Brand" component={Brand} />
          <Stack.Screen name="Filters" component={Filters} />
          <Stack.Screen name="Challenge" component={Challenge} />
          <Stack.Screen name="CameraPage" component={CameraPage} />
          <Stack.Screen name="SendApplication" component={SendApplication} />
          <Stack.Screen name="SendAnswer" component={SendAnswer} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyApplication" component={MyApplication} />
          <Stack.Screen name="Application" component={Application} />
          <Stack.Screen name="AwardsDetails" component={AwardsDetails} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
        </>
      : <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      }
    </Stack.Navigator>
  </NavigationContainer>
))