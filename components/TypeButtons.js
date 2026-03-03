import React from 'react'
import styles, { colors } from '../styles/index'
import {store} from '../stores/AppStore'
import { Text, View, Image, ScrollView, TouchableOpacity} from 'react-native'
import { observer } from 'mobx-react'


@observer
export default class TypeButtons extends React.Component {
  render() {
    return (
      <View style={styles.buttonHeader}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {store.changeRenderType('tiles')}}
        >
          <View 
            style={[
              styles.sortHeader,
              {
                borderColor: store.renderType == 'tiles' 
                  ? colors.orange 
                  : colors.blue2,
                borderTopWidth: store.renderType == 'tiles' ? 1 : 0.5,
              }]}
          >
            <Image
              source={require('../assets/images/icon-tiles.png')}
              style={styles.tabIcon}
            />
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>{
            store.changeRenderType('list')
          }}
        >
          <View
            style={[
              styles.sortHeader,
              {
                borderColor: store.renderType == 'list'
                  ? colors.orange 
                  : colors.blue2,
                borderTopWidth: store.renderType == 'list' ? 1 : 0.5,
              }]} 
          >
            <Image
              source={require('../assets/images/tab-list-off.png')}
              style={styles.tabIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}