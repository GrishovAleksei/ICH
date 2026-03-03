import React from 'react'
import styles, { colors } from '../styles/index'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'

const NextButton = ({store, text}) => {
  return(
    <TouchableOpacity 
      onPress={() => store.tutorialStep++}
      style={[styles.button, 
              styles.tutorialButton]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default NextButton