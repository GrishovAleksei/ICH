import React from 'react';
import { Text, View, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity, Modal, Dimensions} from 'react-native';
import { Video } from 'expo-av';
import styles, { colors } from '../styles/index';
import { observer } from 'mobx-react';
import { store } from '../stores/AppStore'
import {CloseIcon} from "../components/Buttons/CloseIcon";

const { width } = Dimensions.get('window');
  
const icons = {
  'discount': require('../assets/images/icon-discount.png'),
  'bonus': require('../assets/images/icon-fav.png'),
  'other': require('../assets/images/icon-award.png')
}

@observer
export default class AwardsDetails extends React.Component {
  render() {

    if(!this.props.show) return null;
    // console.log("AwardDetail render")
    
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.show}
        onRequestClose={this.props.close}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CloseIcon onPress={() => {
              this.props.close()
              }}/>
            <ScrollView>
              <View style={{
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
                <Text style={{...styles.text}}>
                  Here could be information about the {store.currentChallenge?.awardType}
                </Text>
                <Image
                  source={icons[store.currentChallenge?.awardType]}
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: colors.turquoise,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    tintColor: colors.white,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
}