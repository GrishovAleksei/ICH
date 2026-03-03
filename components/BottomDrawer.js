import React, { Component } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export class BottomDrawer extends Component {
  constructor(props) {
    super(props);
    this._startTopPos = Dimensions.get('window').height - props.initialPos;
    this.topPos = new Animated.Value(this._startTopPos);
    this.state = {
      open: false,
    };
    this.onHandlerStateChange = this.onHandlerStateChange.bind(this);
  }

  onHandlerStateChange(event) {
    if (Dimensions.get('window').height - this.topPos._value < this.props.topPosOffset) {
      this.props.onBottomReached();
    }
  }

  render() {
    // Limit the range of the gesture
    this.topPosFinal = this.topPos.interpolate({
      inputRange: [this.props.endTopPos, Dimensions.get('window').height - this.props.topPosOffset],
      outputRange: [this.props.endTopPos, Dimensions.get('window').height - this.props.topPosOffset],
      extrapolate: 'clamp',
    });

    return (
      <PanGestureHandler maxPointers={1} onGestureEvent={Animated.event([{ nativeEvent: { absoluteY: this.topPos } }], {useNativeDriver: true})}
      onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 4,
            position: 'absolute',
            padding: 20,
            paddingHorizontal: 15,
            backgroundColor: 'white',
            bottom: 0,
            top: this.topPosFinal,
            width: '100%',
          }}
        >
          <View style={{ height: 20, flexDirection: 'row' }}>
            <View style={{ flex: 1 }} />
            <View style={{ width: 50, backgroundColor: '#ddd', height: 6, borderRadius: 3 }}></View>
            <View style={{ flex: 1 }} />
          </View>
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default BottomDrawer;
