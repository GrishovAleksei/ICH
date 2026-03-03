import React from 'react';
import {colors} from "../styles";
import {
    Text,
    View
} from 'react-native';

export default function (x, y, number) {
    return <View style={{
        position:'absolute',
        left: x - 4,
        top: y + 10,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <View style={{
            position:'absolute',
            backgroundColor: '#ee9e4c',
            opacity:0.5,
            width:30,
            height:30,
            borderRadius:15
        }}></View>
        <View style={{
            position:'absolute',
            backgroundColor: '#ee9e4c',
            width:20,
            height:20,
            borderRadius:10
        }}></View>
        <Text style={{color:'white'}}>{number}</Text>
    </View>
}
