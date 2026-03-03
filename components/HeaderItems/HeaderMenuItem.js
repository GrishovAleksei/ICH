import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles';

export class HeaderMenuItem extends Component {
  render() {
    return (
      <View
        style={{
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.textGray,
            paddingHorizontal: 5,
            paddingVertical: 8,
          }}
          onPress={this.props.onPress}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'MontserratSemiBold',
              color: colors.main,
            }}
          >
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
