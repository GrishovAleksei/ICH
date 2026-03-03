import React from 'react';
import styles, {colors} from "../styles";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
    FlatList,
    Image,
    ScrollView,
    Dimensions,
    Alert,
    TextInput, BackHandler
} from 'react-native';

export default function (store) {
    return <View style={{
        zIndex:5,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 60,
        backgroundColor: 'rgba(255,255,255,0.95)',
        flexDirection: 'row'
    }}>

        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                store.currentTab = 'notifications'
            }}>
            <View style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={store.currentTab == 'notifications' ? require('../assets/images/tab-notifications-on.png') : require('../assets/images/tab-notifications-off.png')}
                    style={styles.tabIcon}
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                store.currentTab = 'list'
            }}>
            <View style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={store.currentTab == 'list' ? require('../assets/images/tab-list-on.png') : require('../assets/images/tab-list-off.png')}
                    style={styles.tabIcon}
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                if (!store.tutorialMyChallenges){
                    store.tutorialMyChallenges = 1;
                }
                store.currentTab = 'pending'
            }}>
            <View style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={store.currentTab == 'pending' ? require('../assets/images/tab-logo-on.png') : require('../assets/images/tab-logo-off.png')}
                    style={styles.tabIcon}
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                store.currentTab = 'fav'
            }}>
            <View style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={store.currentTab == 'fav' ? require('../assets/images/cup-on.png') : require('../assets/images/cup.png')}
                    style={styles.tabIcon}
                />
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
                store.currentTab = 'profile'
            }}>
            <View style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    source={store.currentTab == 'profile' ? require('../assets/images/tab-profile-on.png') : require('../assets/images/tab-profile-off.png')}
                    style={styles.tabIcon}
                />
            </View>
        </TouchableOpacity>
    </View>
}
