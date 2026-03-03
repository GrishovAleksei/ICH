import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function ShowButtons() {
    return (
        <TouchableOpacity
            onPress={() => store.tutorialStep++}
            style={[styles.button, styles.buttonTutorial]}
        >
            <Text style={styles.buttonText}>Дальше</Text>
        </TouchableOpacity>
    )
}