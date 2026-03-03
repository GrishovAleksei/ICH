import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, Dimensions, Alert} from 'react-native';
import styles, { colors } from '../styles/index';
import {CloseIcon} from "./Buttons/CloseIcon";
import {store} from '../stores/AppStore'

const {width} = Dimensions.get('window');

export default FeedBackModal = ({show , close, send}) => {

  const [value, onChangeText] = React.useState('');
  const [currentField, setCurrentField] = React.useState('');

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
          <View 
          style={[styles.formAuth,
            currentField == 'feedbackMessage'
                ? styles.formAuthActive : null]}
            //     currentField == 'feedbackMessage' 
            // ? styles.formItemActive 
            // : {width: '100%', textAlign: 'center', alignItems: 'center'}}
          >
            <TextInput
              placeholder={'Возникли проблемы?\nНапишите нам'}
              style={{
                ...styles.formAuthValue,
                  fontSize: 14,
                  flexWrap: 'wrap',
              }}
              autoFocus={false}
              numberOfLines={5}
              onFocus={(e) => {
                setCurrentField('feedbackMessage')
              }}
              onBlur={(e) => {
                setCurrentField('')
              }}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
          </View>

          <TouchableOpacity
            onPress={async () => {
              let result = await store.apiCall('feedback', {
                                          id: store.userId,
                                          feedback: value
                                        });
              onChangeText('')
              close()
              Alert.alert('Обратная связь', 'Сообщение отправлено успешно');
            }}
          >
            <Text style={{...styles.button,
                          color: colors.white,
                          backgroundColor: '#6288be'}}>
                Отправить сообщение
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}