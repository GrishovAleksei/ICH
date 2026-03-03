import React from 'react';
import { Text, View, Image, TouchableOpacity, Modal} from 'react-native';
import styles, { colors } from '../styles/index';
import {CloseIcon} from "./Buttons/CloseIcon";

export default SendApplicationModal = ({challenge, show , close, showGallery, takePhoto}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={close}
    >
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, justifyContent:'center'}}>
          <CloseIcon onPress={close}/>

          <TouchableOpacity
            onPress={showGallery}
            style={{
              ...styles.button,
              margin: 10,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center'
            }}
          > 
            <Image source={challenge.type == 'video' 
                          ? require('../assets/images/videoGallery.png')
                          : require('../assets/images/photoGallery.png')} 
                  style={{...styles.tabIcon, tintColor: colors.white, marginRight: 10}}/>
            <Text style={{...styles.buttonText, flexWrap: 'wrap'}}>Выбрать {challenge.type == 'video' ? 'видео' : 'фото'} из галереи</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              ...styles.button,
              margin: 10,
              flexDirection: 'row',
              width: '100%',
              backgroundColor: colors.turquoise,
              justifyContent: 'center'
            }}
          >
            <Image  source={challenge.type == 'video' 
                      ? require('../assets/images/videoCamera.png')
                      : require('../assets/images/photoCamera.png')} 
                    style={{...styles.tabIcon, tintColor: colors.white, marginRight: 10}}/>
            <Text style={styles.buttonText}>
              Сделать {challenge.type == 'video' ? 'видео' : 'фото'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}