import React from 'react';
import styles, { colors } from '../styles/index';
import { SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, ImageBackground, FlatList, Image, ScrollView, Dimensions, Picker, TextInput } from 'react-native';
import { observer } from 'mobx-react';
import { SwipeListView } from 'react-native-swipe-list-view';
import ShowChallenge from '../components/ShowChallenge';

@observer
export default class Search extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
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
          <Text style={styles.headerTitle}>Поиск</Text>
          <View style={{ flex: 1, marginRight: 50 }}></View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: colors.blue3,
            paddingVertical: 5,
            paddingHorizontal: 5,
            marginHorizontal: 5,
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 20,
              paddingLeft: 5,
            }}
          >
            <Image source={require('../assets/images/top-search.png')} style={styles.accountSettingsIcon} />
            <TextInput
              placeholder="Введите название челленджа"
              style={styles.formValue}
              onChangeText={(e) => {
                store.searchField = e;
                setTimeout(async () => {
                  if (store.searchField.length > 5 && store.searchFieldPrev != store.searchField) {
                    let result = await store.apiCall('add-search', {
                      text: store.searchField,
                    });
                    store.searchFieldPrev = store.searchField;
                  }
                }, 2000);
              }}
              value={store['searchField']}
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingTop: 15,
            flex: 1,
          }}
        >
          <Text
            style={{
              paddingLeft: 15,
              fontSize: 22,
              color: colors.main,
            }}
          >
            Популярные запросы
          </Text>
          <ScrollView
            horizontal={true}
            style={{
              height: 80,
              paddingVertical: 10,
            }}
          >
            {store.searches.map((item, key) => {
              return (
                <TouchableOpacity
                  key={'search-' + key}
                  onPress={() => {
                    store.searchField = item;
                    setTimeout(async () => {
                      if (store.searchField.length > 5 && store.searchFieldPrev != store.searchField) {
                        let result = await store.apiCall('add-search', {
                          text: store.searchField,
                        });
                        store.searchFieldPrev = store.searchField;
                      }
                    }, 2000);
                  }}
                >
                  <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <SwipeListView
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={3}
            contentContainerStyle={{
              paddingBottom: 70,
            }}
            renderItem={({ item }) => {
              let search = store.searchField.toLowerCase();
              if (search.length && item.title.toLowerCase().indexOf(search) > -1) {
                return ShowChallenge(store, navigate, item);
              }
              return <View />;
            }}
            data={store.challenges}
          />
        </View>
      </View>
    );
  }
}
