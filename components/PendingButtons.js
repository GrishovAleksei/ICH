import React from 'react'
import styles, { colors } from '../styles/index'
import {store} from '../stores/AppStore'
import { View, Image, TouchableOpacity} from 'react-native'
import { observer } from 'mobx-react'


@observer
export default class PendingButtons extends React.Component {
  render() {
    return (
      <View style={styles.buttonHeader}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {store.changePendingType('moderation')}}
        >
          <View 
            style={[
              styles.sortHeader,
              {
                borderColor: store.pendingType == 'moderation' 
                  ? colors.orange 
                  : colors.blue2,
                borderTopWidth: store.pendingType == 'moderation' ? 1 : 0.5,
              }]}
          >
            <Image
              source={store.pendingType == 'moderation' ? require('../assets/images/icon-my-moder-on.png') : require('../assets/images/icon-my-moder-off.png')}
              style={styles.tabIcon}
            />
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>{
            store.changePendingType('awards')
          }}
        >
          <View
            style={[
              styles.sortHeader,
              {
                borderColor: store.pendingType == 'awards'
                  ? colors.orange 
                  : colors.blue2,
                borderTopWidth: store.pendingType == 'awards' ? 1 : 0.5,
              }]} 
          >
            <Image
              source={store.pendingType == 'awards' ? require('../assets/images/icon-my-awards-on.png') : require('../assets/images/icon-my-awards-off.png')}
              style={styles.tabIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}