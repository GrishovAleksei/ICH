import React from 'react';
import {Dimensions, AsyncStorage, Image, Text, View, Alert} from 'react-native';
import {action, observable, configure} from 'mobx';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import dayjs from 'dayjs';
export default class AppStore {
  messages = {
    frontMessage: 'ichazy - текст про приложение',
    frontButton: 'Регистрация',
    frontAlreadyAccount: 'Уже зарегистрированы?',
    frontSignIn: 'Войти',
    signInHeader: 'Вход',
    availableBalance: 'Available balance',
    exp: 'Exp.',
    history: 'History',
    logout: 'Выход',
    noTransactions: "You don't have any transactions yet",
    balanceHeader: 'Баланс',
    addBalance: 'Пополнить',
    name: 'Имя',
    surname: 'Фамилия',
    nick: 'Никнейм',
    email: 'Email',
    phone: 'Телефон',
    password: 'Пароль',
    retypePassword: 'Повторите пароль',
    address: 'Address',
    bankName: 'Bank name',
    iban: 'IBAN',
    swift: 'SWIFT',
    verifyPhoneHeader: 'Phone number verification',
    phoneCode: 'The code was sent to the number',
    enterVerifyCode: 'Verification code',
    submit: 'Submit',
    orderCard: 'Order card',
    avatarHeader: 'Загрузите фото профиля',
    signUpHeader: 'Регистрация',
    signUp: 'Зарегистрироваться',
    passwordsNotMatch: 'Пароли не совпадают',
    allFieldsRequired: 'Все поля должны быть заполнены',
    inputParametters: 'Формат Email должен быть mail@ma.ru"\n"Пароль должен быть минимум 6 символов',
    step1: 'Step 1 of 5',
    step2: 'Step 2 of 5',
    step3: 'Step 3 of 5',
    step4: 'Step 4 of 5',
    step5: 'Step 5 of 5',
    verifyEmail: '',
    phoneRequired: 'Please provide valid phone number',
    verifyPhone: 'Phone number to send verification code:',
    next: 'Next →',
    age: 'Возраст',
    country: 'Страна',
    city: 'Город',
  };
  @observable challenges = {}
  @observable globalSettings = [];
  @observable tutorialStep = 1;
  @observable tutorialStarted = null;
  @observable tutorialMyChallenges = null;
  @observable order = 'date';
  @observable awards = [];
  @observable showAwardDetails = false;
  @observable likes = {};
  @observable surname = '';
  @observable nick = '';
  @observable currentLikesCount = 0;
  @observable currentCustomer = {};
  @observable brands = [];
  @observable applications = [];
  @observable customers = [];
  @observable fbProfile = {};
  resendApplication = 0;
  @observable filters = {
    video: false,
    image: false,
    compexity1: false,
    compexity2: false,
    compexity3: false,
    points: false,
    discount: false,
    bonuses: false,
    sport: false,
    beauty: false,
    health: false,
    children: false,
    car: false,
    hobby: false,
    construction: false,
    travel: false,
  };
  @observable filtersEnabled = false;
  @observable applicationAnswer = '';
  @observable isMuted = true;
  @observable showFeedbackModal = false;
  @observable feedbackMessage = '';
  @observable notifications = [
    /*{
            id:0,
            key: 'n0',
            type: 'new-challenge',
            title: '#тетрисчеллендж',
            brand: "3"
        },
        {
            id:1,
            key: 'n1',
            type: 'award',
            title: '#амчеллендж',
            amount: 25
        },
        {
            id:2,
            key: 'n2',
            type: 'new-challenge',
            title: '#первыешагичеллендж',
            brand: "3"
        },*/
  ];
  @observable showLegend = true;
  @observable wins = [];
  @observable transactions = [];
  //  currentField = null;
  @observable currentChallenge = null;
  @observable currentImage = null;
  @observable currentVideo = null;
  @observable k = null;
  @observable currentTab = 'list';
  @observable tabIndex = 0;
  @observable userId = null;
  @observable email = '';
  @observable phone = null;
  @observable password = '';
  @observable city = '';
  @observable country = null;
  @observable gender = null;
  @observable showBlocked = null;
  @observable verifiedEmail = true;
  @observable verifiedPhone = false;
  @observable verifiedAccount = false;
  @observable paid = false;
  @observable newPassword = '';
  @observable agreementCheckbox = false;
  @observable agreement = false;
  @observable retypePassword = '';
  @observable version = '0.01';
  @observable loading = false;
  @observable avatar = null;
  @observable card = {};
  @observable name = '';
  @observable age = '';
  @observable surname = '';
  @observable challengesFilter = 'all';
  @observable showTransactions = null;
  @observable searchField = '';
  searchFieldPrev = '';
  @observable showOldChallenges = false;
  @observable showOldAwards = false;
  @observable pendingFavView = 'list';
  @observable verifyCode = null;
  @observable account = {};
  @observable profileEditable = false;
  @observable searches = [];
  @observable renderType = 'tiles';
  @observable pendingType = 'pending';
  @observable showSocialsModal = false;
  @observable currentChallengeFromProfile = null;
  @observable currentApplication = null;
  @observable currentLikesCountFromProfile = 0;

  @observable balance = 0;
  @observable applicationComment = '';
  @observable fav = [];
  @observable trash = [];
  @observable award = false;
  @observable jwt = false;
  @observable tutorialCompleted = '';
  // serverUrl = 'https://api.ichazy.com';
  serverUrl = 'http://sal4.xyz:49916'
  // apiUrl = this.serverUrl + '/index.php';
  
  @action
  changeRenderType(type){this.renderType = type}
  @action
  changePendingType(type){this.pendingType = type}

  

  @action
  async saveJWT(token) {
    try {
      this.jwt = token;
      await AsyncStorage.setItem('jwt', this.jwt);
    } catch (error) {
      console.warn(error);
    }
  }

  @action
  async saveTutorialStatus(completed) {
    try {
      this.tutorialCompleted = completed
      await AsyncStorage.setItem('globalSettings', this.tutorialCompleted);
    } catch (error) {
      console.warn(error);
    }
  }

  // @action
  // async removeFav(item, index) {
  //   try {
  //     item = item.toString();
  //     if (this.fav.indexOf(item) > -1) {
  //       this.fav.splice(this.fav.indexOf(item), 1);
  //       this.fav = this.fav.slice();
  //       await AsyncStorage.setItem('fav', JSON.stringify(this.fav));
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // @action
  // async addFav(item) {
  //   console.log('addFav', item);
  //   try {
  //     if (this.fav.indexOf(item) == -1) {
  //       this.fav.push(item);
  //       await AsyncStorage.setItem('fav', JSON.stringify(this.fav));
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // @action
  // async clearFav() {
  //   console.log('clearFav');
  //   try {
  //     await AsyncStorage.removeItem('fav');
  //     await AsyncStorage.removeItem('trash');
  //     this.trash = [];
  //     this.fav = [];
  //     this.getFav();
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // @action
  // async getFav() {
  //   try {
  //     let fav = await AsyncStorage.getItem('fav');
  //     if (fav) {
  //       this.fav = JSON.parse(fav);
  //     }

  //     let trash = await AsyncStorage.getItem('trash');
  //     if (trash) {
  //       this.trash = JSON.parse(trash);
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  @action
  async removeJWT() {
    try {
      await AsyncStorage.removeItem('jwt');
      this.jwt = null;
    } catch (error) {
      console.warn(error);
    }
  }

  @action
  async getJWT() {
    try {
      this.jwt = await AsyncStorage.getItem('jwt');
      return this.jwt;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  @action
  async getTutorialState() {
    try {
        return [
            await AsyncStorage.getItem('globalSettings'),
            await AsyncStorage.getItem('tutorial-account'),
            await AsyncStorage.getItem('tutorial-challenges')
        ];
    } catch (error) {
        console.warn(error);
    }
  }

  @action
  async closeTutorial(type) {
      try {
          if (type=='account'){
              this.tutorialStarted = null;
          } else {
              this.tutorialMyChallenges = 2
          }
          await AsyncStorage.setItem('tutorial-'+type, "1");
      } catch (error) {
          console.warn(error);
      }
  }
  picker(type) {
    return ImagePicker.launchImageLibraryAsync({
      title: 'Select file',
      mediaTypes: 
        type == 'video' 
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
    })
  }

  takePhotoAndUpload = async (type) => {
    // this.loading = false;
    const maxDuration = 30000

    const {status, permissions} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await this.picker(type)
      if (result.uri) {   
        if (type == 'video') {    
          if (result.duration > maxDuration ) {
            return Alert.alert(
              'Извините',
              'Длительность видео должно быть не более 30 секунд.',
              [
                { text: 'OK', onPress: () => false }
              ],
              { cancelable: false }
            )
          } else {
            this.k = result.width / result.height
            this.currentVideo = result.uri
          }
        } else {
          this.k = result.width / result.height
          this.currentImage = result.uri
        }
        return result.uri
      } else return false
    } else return false
  }

  get = function (obj, id) {
    if (this[obj]) {
      var found = false;
      this[obj].forEach(function (el) {
        if (el.id == id) {
          found = el;
        }
      });
      return found;
    }
    return null;
  };
  // sortByOrder = function (array) {
  //   let self = this;
  //   return array.slice().sort(function (a, b) {
  //     if (self.order == 'popularity') {
  //       if (a.applications.length > b.applications.length) {
  //         return -1;
  //       }
  //       if (a.applications.length < b.applications.length) {
  //         return 1;
  //       }
  //       return 0;
  //     } else {
  //       let aorder = 0;
  //       let border = 0;
  //       if (a.order) aorder = a.order;
  //       if (b.order) border = b.order;

  //       if (aorder > border) {
  //         return -1;
  //       }

  //       if (aorder < border) {
  //         return 1;
  //       }

  //       return 0;
  //     }
  //   });
  // };
  // checkFilters = function () {
  //   let filtersEnabled = false;
  //   for (let i in this.filters) {
  //     let item = this.filters[i];
  //     if (item === true) {
  //       filtersEnabled = true;
  //     }
  //   }
  //   this.filtersEnabled = filtersEnabled;
  // };

  renderAnswer = function (item) {
    if (typeof item.answer == 'string' && item.answer[0] == '[') {
      item.answer = JSON.parse(item.answer);
    } else {
      if (typeof item.answer == 'string') item.answer = item.answer.split(',');
    }
    if (item.type == 'checkbox') {
      return item.answer.map((el, i) => (
        <View key={'answer' + i} style={{flexDirection: 'row', paddingVertical: 5}}>
          <Image style={{width: 20, height: 20}} source={require('../assets/images/ic_check_box.png')}/>
          <Text>{el}</Text>
        </View>
      ));
    }
    if (item.type == 'radio') {
      return (
        <View key={'answer0'} style={{flexDirection: 'row', paddingVertical: 5}}>
          <Image style={{width: 20, height: 20}} source={require('../assets/images/ic_check_box.png')}/>
          <Text>{item.answer}</Text>
        </View>
      );
    }
    return <Text style={{textAlign: 'center'}}>{item.answer}</Text>;
  };

  renderStatus = function (status) {
    if (status == 'pending') return 'На проверке';
    if (status == 'accepted') return 'Проверена';
    if (status == 'won') return 'Проверена, победила';
    if (status == 'lost') return 'Проверена, не победила';
    if (status == 'rejected') return 'Отклонена администратором';
    if (status == 'cancelled') return 'Отменена пользователем';
  };
  useApplication = async (id, noUsed = false) => {
    if (this.jwt) {
      return await this.apiCall('use-application', {id, noUsed});
    } else {
      return false;
    }
  };
  complaintApplication = async (application_id, about) => {
    if (this.jwt) {
      return await this.apiCall('complaint_to_application', {application_id, about});
    }

    return false;
  };
  complaintsCustomer = async (customer_id, about) => {
    if (this.jwt) {
      return await this.apiCall('complaint_to_customer', {customer_id, about});
    }

    return false;
  };
  toggleBlockApplication = async (application_id, isBlock) => {
    if (this.jwt) {
      return await this.apiCall(isBlock ? 'block_application' : 'unblock_application', {application_id});
    }

    return false;
  };
  toggleBlockCustomer = async (customer_id, isBlock) => {
    if (this.jwt) {
      console.log('isBlock', isBlock)
      return await this.apiCall(isBlock ? 'block_customer' : 'unblock_customer', {customer_id});
    }

    return false;
  };
  // loadData = async () => {
  //   // if (this.jwt) {
  //     let result = await this.apiCall('load-customer-data');
  //     await this.getFav();

  //     // console.log('load-customer-data', result);
  //     let self = this;

  //     if (result.success) {
  //       let data = result.data;

  //       if (!result.data.customer || !result.data.customer || !result.data.customer.data) {
  //         return false;
  //       }

  //       let customer = data.customer.data;
  //       this.userId = data.customer.id;
  //       this.name = customer.name;
  //       this.email = customer.email;
  //       this.avatar = customer.avatar;
  //       this.age = customer.age;
  //       this.surname = customer.surname;
  //       this.nick = customer.nick;

  //       if (typeof customer.fbProfile == 'string') {
  //         this.fbProfile = JSON.parse(customer.fbProfile);
  //       }

  //       this.verifiedEmail = customer.verifiedEmail !== false;
  //       this.country = customer.country ? customer.country : 'rus';
  //       this.city = '';
  //       this.gender = customer.gender ? customer.gender : 'm';
  //       this.showBlocked = customer.show_self_blocked_content;
  //       this.birthday = customer.birthday;

  //       if (customer.likes) {
  //         this.likes = customer.likes;
  //       }

  //       let transactions = [];
  //       let balance = 0;

  //       data.transactions.forEach((el) => {
  //         balance += parseInt(el.data.amount) * (el.data.from_type == 'customer' ? -1 : 1);
  //         el.data.id = el.id;
  //         transactions.push(el.data);
  //       });
  //       this.transactions = transactions;
  //       this.balance = balance;

  //       let brands = [];

  //       if (data.brands.length) {
  //         data.brands.forEach((el) => {
  //           let item = el.data;
  //           item.id = el.id;
  //           brands.push(item);
  //         });
  //       }

  //       this.brands = brands;

  //       let challenges = [];

  //       if (data.challenges.length) {
  //         data.challenges.forEach((el, i) => {
  //           let challenge = el.data;
  //           challenge.id = el.id;
  //           challenge.key = 'challenge-' + el.id;
  //           challenge.applications = el.applications;
  //           challenge.examples = el.examples && typeof (el.examples == 'string') ? JSON.parse(el.examples) : null;
  //           //console.log('challenge.applications', challenge.applications)
  //           challenge.brandTitle = self.get('brands', challenge.brand).title;
  //           challenges.push(challenge);
  //         });
  //       }

  //       this.challenges = challenges;
  //       let searches = [];

  //       if (data.searches && data.searches.length) {
  //         data.searches.forEach((el) => {
  //           searches.push(el.text);
  //         });
  //       }

  //       this.searches = searches;
  //       let applications = [];
  //       let wins = [];
  //       let awards = [];

  //       if (data.applications.length) {
  //         data.applications.forEach((el) => {
  //           let app = el.data;
  //           app.key = 'app-' + el.id;
  //           app.id = el.id;
  //           app.date = dayjs(new Date(el.meta.created_at * 1000)).format('DD.MM.YYYY');
  //           app.statusText = self.renderStatus(app.status);
  //           app.title = self.get('challenges', app.challenge).title;

  //           if (app.status != 'won') {
  //             applications.push(app);
  //           } else {
  //             let challenge = self.get('challenges', app.challenge);
  //             //app.award = self.get('challenges', app.challenge).awardSum;
  //             app.award = challenge.awardSum;
  //             app.awardAmount = challenge.awardAmount;
  //             // if (challenge.awardType == 'bonus' || challenge.awardType == 'discount') {
  //             app.awardText = el.promo; // challenge.awards.split(/\r?\n/)[0];
  //             app.promo = el.promo;
  //             app.awardType = challenge.awardType;
  //             app.awardEnd = challenge.awardEnd;
  //             app.awardDescription = challenge.awardDescription;
  //             app.promoViewType = challenge.promoViewType;
  //             awards.push(app)
  //             wins.push(app);
  //           }
  //         });
  //       }
  //       // console.log("AWARDS ", awards)

  //       let usedAwards = awards.filter(item => item.isUsed);
  //       let activeAwards = awards.filter(item => !item.isUsed);
  //       wins = wins.filter(item => !item.isUsed);

  //       this.notifications = data.notifications;
  //       //console.log(data.notifications);
  //       this.applications = applications;
  //       this.wins = wins;
  //       this.awards = activeAwards;
  //       this.usedAwards = usedAwards;
  //       // console.log("THISAWARDS", this.awards)
  //       // console.log("USEDAWARDS", this.usedAwards)

  //       if (data.customers.length) {
  //         this.customers = data.customers;
  //       }

  //       if (this.loadDataTimeout) {
  //         clearTimeout(this.loadDataTimeout);
  //       }

  //       if (!this.loadDataTimeout)
  //       {
  //           let result = await this.apiCall('global-settings');
  //           let resultData = result.data;
  //           this.globalSettings = resultData;
  //           this.loadDataTimeout = setTimeout(() => this.loadData(), this.globalSettings.refresh_period);
  //       }
  //     } else {
  //       await this.removeJWT();
  //       this.loading = false;

  //       return false;
  //     }

  //     return result;
  //   // } else {
  //   //   console.warn('Нет интернет соединения')
  //   //   return false;
  //   // }
  // };

  auth = async (authData) => {
    store.loading = true
    let data = JSON.stringify(authData)
    const response = await fetch(this.serverUrl + '/api/token/', {
      method: 'POST',
      body: data,
      headers: {'Content-Type': 'application/json'}
    })

    if (response.ok) {
      const result = await response.json()
      await store.saveJWT(result.access);
      // await store.loadData()
      store.loading = false
      await store.getChallenges()
      
    } else {
      return console.log(result.errorMessage)
    }     
  }

  getChallenges = async () => {
    store.loading = true
    const response = await fetch(this.serverUrl + '/challenges/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + store.jwt,
      }
    })
    const result = await response.json()
    this.challenges = result
    console.log(this.challenges)
    store.loading = false
  }
}




  // apiCall = async (action, params) => {
  //   console.log('apiCall', action, params);
  //   if (!params) {
  //     params = {}
  //   }

    // if (this.jwt) {
    //   params['jwt'] = this.jwt
    // }

    // let paramsUrl = '';
    // if (typeof params == 'object') {
    //   paramsUrl = JSON.stringify(params)
    // }
    // const response = await fetch(this.serverUrl + action, {
    //   method: 'POST',
    //   body: paramsUrl,
    //   headers: {'Content-Type': 'application/json'}
    // })
    // const result = await response.json()
    
    
    // if (typeof params == 'object') {
    //   paramsUrl = Object.keys(params)
    //     .map(function (k) {
    //       if (typeof params[k] !== 'string') {
    //         params[k] = JSON.stringify(params[k]);
    //       } else {
    //         params[k] = encodeURIComponent(params[k]);
    //       }
    //       return encodeURIComponent(k) + '=' + params[k];
    //     })
    //     .join('&');
    // }

   
    

    // const response = await fetch(this.apiUrl, {
    //   method: 'POST',
    //   body: `action=${action}&${paramsUrl}`,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // });
    // if (response.ok) {
    //   let text = await response.text();
    //   try {
    //     return JSON.parse(text);
    //   } catch (e) {
    //     console.log('response error', text);
    //     this.loading = false;
    //   }
    // } else {
    //   this.loading = false;
    //   let text = await response.text();
    //   console.log('response.status', response.status);
    //   console.log('response error', text);
    //   return {error: text};
    // }
    // this.loading = false;
    // throw new Error(await response.text());
//   };
// }
//   };
// configure({
//   useProxies: "never"
// })

let store = new AppStore()

const StoreContext = React.createContext();
 
export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
 
/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
 
/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};

export { store }
