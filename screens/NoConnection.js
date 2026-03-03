import React from 'react';
import styles from '../styles/index';
import { Text, View, Image} from 'react-native';
import { observer } from 'mobx-react';
import { withStore } from '../stores/AppStore';

@withStore
@observer
export default class NoConnection extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const p = this.props;
    const store = p.store;
    
    return (
      <View style={styles.splashWrapper}>
        <View style={styles.splashHeader}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.splashImage}
          />
          <Text style={[styles.splashText, styles.splashTitle]}>
            Просим прощения
          </Text>
          <Text style={styles.splashText}>
            Пытаемся установить соединение с сервером
          </Text>
        </View>

      </View>
    );
  }
}

