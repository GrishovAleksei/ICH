import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class CloseIcon extends Component {

  render() {
    return (
      <TouchableOpacity style={{
        position: 'absolute',
        right: 10,
        top: 10,
        width: 30,
        height: 30,
        backgroundColor: '#f99d2e',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }} onPress={this.props.onPress}>
        <Icon
          style={{
            color: 'white',
            alignSelf: 'center',
          }}
          name={'close'}
          size={20}
        />
      </TouchableOpacity>
    );
  }
}
