import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, ImageBackground, ScrollView, FlatList, Image, Share, TextInput } from 'react-native';
import { observer } from 'mobx-react';
import { FontAwesome5 } from '@expo/vector-icons';
import { withStore } from '../stores/AppStore';

@withStore
@observer
export default class Filters extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    const store = p.store;
    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>Фильтр челленджей</Text>
          <View style={{ flex: 1, marginRight: 50 }}></View>
        </View>
        <ScrollView
          style={{
            width: '100%',
            flex: 1,
          }}
          contentContainerStyle={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 15,
            width: '100%',
          }}
        >
          <View
            style={{
              width: '100%',
            }}
          >
            <Text style={styles.filterHeader}>Сортировка</Text>
            <TouchableOpacity
              onPress={() => {
                store.order = 'date';
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/tab-list-off.png')} style={styles.filterItemImg} />
                <Text style={store.order == 'date' ? styles.filterItemTextActive : styles.filterItemText}>По умолчанию</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.order = 'popularity';
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/icon-my-awards-off.png')} style={styles.filterItemImg} />
                <Text style={store.order == 'popularity' ? styles.filterItemTextActive : styles.filterItemText}>По популярности</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.filterHeader}>Способ фиксации</Text>
            <TouchableOpacity
              onPress={() => {
                store.filters['video'] = !store.filters['video'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/icon-video.png')} style={styles.filterItemImg} />
                <Text style={store.filters['video'] ? styles.filterItemTextActive : styles.filterItemText}>Видео</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['image'] = !store.filters['image'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/icon-image.png')} style={styles.filterItemImg} />
                <Text style={store.filters['image'] ? styles.filterItemTextActive : styles.filterItemText}>Фото</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.filterHeader}>Уровень сложности</Text>
            <TouchableOpacity
              onPress={() => {
                store.filters['complexity1'] = !store.filters['complexity1'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/complexity-1.png')} style={styles.filterItemImg} />
                <Text style={store.filters['complexity1'] ? styles.filterItemTextActive : styles.filterItemText}>Лайт-челлендж</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['complexity2'] = !store.filters['complexity2'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/complexity-2.png')} style={styles.filterItemImg} />
                <Text style={store.filters['complexity2'] ? styles.filterItemTextActive : styles.filterItemText}>Медиум-челлендж</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['complexity3'] = !store.filters['complexity3'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/complexity-3.png')} style={styles.filterItemImg} />
                <Text style={store.filters['complexity3'] ? styles.filterItemTextActive : styles.filterItemText}>Гипер-челлендж</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.filterHeader}>Награды</Text>

            <TouchableOpacity
              onPress={() => {
                store.filters['points'] = !store.filters['points'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <View
                  style={{
                    backgroundColor: colors.blue3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 30,
                    marginRight: 8,
                    borderRadius: 17,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'MontserratRegular',
                      fontSize: 18,
                    }}
                  >
                    М
                  </Text>
                </View>
                <Text style={store.filters['points'] ? styles.filterItemTextActive : styles.filterItemText}>Монеты</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['discount'] = !store.filters['discount'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/icon-discount-off.png')} style={[styles.filterItemImg, { width: 20, marginLeft: 5, marginRight: 12 }]} />
                <Text style={store.filters['discount'] ? styles.filterItemTextActive : styles.filterItemText}>Скидка</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['bonuses'] = !store.filters['bonuses'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <View
                  style={{
                    backgroundColor: colors.blue3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 30,
                    marginRight: 10,
                    borderRadius: 17,
                  }}
                >
                  <Image
                    source={require('../assets/images/icon-fav.png')}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <Text style={store.filters['bonuses'] ? styles.filterItemTextActive : styles.filterItemText}>Бонусы</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                store.filters['other'] = !store.filters['other'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Image source={require('../assets/images/icon-bonus-off.png')} style={[styles.filterItemImg, { width: 20, marginLeft: 5, marginRight: 12 }]} />
                <Text style={store.filters['other'] ? styles.filterItemTextActive : styles.filterItemText}>Другое</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.filterHeader}>Категории</Text>
            <TouchableOpacity
              onPress={() => {
                store.filters['sport'] = !store.filters['sport'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['sport'] ? styles.filterItemTextActive : styles.filterItemText}>Спорт</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['beauty'] = !store.filters['beauty'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['beauty'] ? styles.filterItemTextActive : styles.filterItemText}>Красота</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['health'] = !store.filters['health'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['health'] ? styles.filterItemTextActive : styles.filterItemText}>Здоровье</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['children'] = !store.filters['children'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['children'] ? styles.filterItemTextActive : styles.filterItemText}>Дети</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['car'] = !store.filters['car'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['car'] ? styles.filterItemTextActive : styles.filterItemText}>Автомобили</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['hobby'] = !store.filters['hobby'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['hobby'] ? styles.filterItemTextActive : styles.filterItemText}>Хобби</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['construction'] = !store.filters['construction'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['construction'] ? styles.filterItemTextActive : styles.filterItemText}>Строительство</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store.filters['travel'] = !store.filters['travel'];
                store.checkFilters();
              }}
            >
              <View style={styles.filterItem}>
                <Text style={store.filters['travel'] ? styles.filterItemTextActive : styles.filterItemText}>Путешествия</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
