import React from 'react'
import styles, { colors } from '../styles/index'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'

const SkipButton = ({store, text, style}) => {
  return(
    <TouchableOpacity onPress={() => {
        let completed = 'true'
        store.saveTutorialStatus(completed)
      }}
      style={[styles.tutorialClose, style]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default SkipButton