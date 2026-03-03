import React from 'react';
import {observer} from 'mobx-react';
import Badge from "../components/Badge";
import styles from "../styles";
import {
    Dimensions,
    Image,
} from 'react-native';
import Account from './Account';
import { View, Text } from 'react-native';
import pages from '../data/TutorialPages'
import FontSizer from '../components/FontSizer'
import SkipButton from '../components/SkipButton'
import NextButton from '../components/NextButton'
import Constants from 'expo-constants';
import Svg, { G, Line, Rect, Use, Defs, Mask } from 'react-native-svg'

import {withStore} from '../stores/AppStore'

const { width, height } = Dimensions.get('window');


function Step({p, store}) {
    return (
    <>
        <Account navigation={p.navigation}
                 screenProps={p.screenProps}/>
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
        }}>
            <Svg height='100%' width='100%'>
                <Defs>
                    {
                        pages[store.tutorialStep-2].masks
                        .map((point, index) => 
                            <Line
                                key={index}
                                id={`mask-${index}`}
                                strokeLinecap='round'
                                {...point}
                            />
                        )
                    }
                    <Mask id='mask' x='0' y='0' width='100%' heigh='100%'>
                        <Rect width='100%' height='100%' fill='white'/>
                        <G y={Constants.statusBarHeight}>
                            {
                                pages[store.tutorialStep-2].masks
                                .map((item, index) => 
                                    <Use
                                        key={index}
                                        href={`#mask-${index}`}
                                        stroke='black'
                                        strokeWidth='42'
                                    />
                                )
                            }
                        </G>
                        <Use href="#line" stroke='black'/>
                    </Mask>
                </Defs>
                <G mask='url(#mask)'>
                    <Rect x="0" y="0" width='100%' height='100%'
                        fill="rgba(0,0,0,0.85)"/>
                    <G y={Constants.statusBarHeight}>
                        {
                            pages[store.tutorialStep-2].masks
                            .map((item, index) => 
                                <Use
                                    key={index}
                                    href={`#mask-${index}`}
                                    stroke='orange'
                                    strokeWidth='47'
                                />
                            )
                        }
                    </G>
                </G>
            </Svg> 
        </View>

        <View style={styles.tutorialHelpers}>
            { pages[store.tutorialStep-2].masks
                .map((point, index) => (
                    <View key={index}>
                        {Badge( point.x1 , point.y, index + 1)}
                    </View>)
                ) 
            }
            <View style={pages[store.tutorialStep-2].textPadding}>
                {pages[store.tutorialStep-2].text
                    .map((sentence, index) =>
                        <Text style={styles.tutorialText}
                            key={index}
                        >
                            {sentence}
                        </Text>
                )}
            </View>
            { store.tutorialStep !== 6
                ? <View>
                    <NextButton store={store} text='Дальше'/>
                    <SkipButton store={store} text='Пропустить'/>
                </View>

                : <SkipButton store={store} style={styles.button} text='Всё ясно!'/>
            }
        </View>
    </>)
}
@withStore
@observer export default class AccountWrapper extends React.Component
{
    static navigationOptions = {
        headerShown: false
    }

    componentDidMount()
    {
        setTimeout(async ()=>
        {
            const store = this.props.store;

            const tutorialState = await store.getTutorialState();

            if (tutorialState[1]) store.tutorialMyChallenges = 2;
            
            if (tutorialState[0]) {
                store.closeTutorial('account');
                return false;
            }
            store.tutorialStarted = true;
        }, 1000);
    }

    render()
    {
        const p = this.props;
        const store = p.store;

        return (
            !store.tutorialCompleted

            ? store.tutorialStarted
                ? <View style={{flex: 1}}>
                    { store.tutorialStep != 1 ?
                        <Step p={p} store={store}/>
                        : null
                    }
                    
                    { store.tutorialStep == 1
                        ?
                        <>
                            <View style={{flex: 1, width: '100%'}}>
                                <Account navigation={p.navigation} 
                                        screenProps={p.screenProps}/>
                                <View
                                    style={[styles.tutorialBlock, {
                                        backgroundColor: 'rgba(0,0,0,0.65)'
                                    }]}
                                >
                                </View>
                            </View>

                            <View style={styles.tutorialBlock}>

                                <Image
                                    source={require('../assets/images/logo.png')}
                                    style={{ width: 150, height: 150, resizeMode: 'contain'}}
                                />

                                <Text style={{...styles.tutorialFirstStepText,
                                            fontSize: FontSizer(width)
                                            }}>
                                    Привет! Меня зовут Чейзи, я немного расскажу тебе о приложении, ты не против?
                                    Выполняй простые челленджи от брендов и получай за это крутые награды!
                                </Text>

                                <NextButton store={store} text='Дальше'/>
                                <SkipButton store={store} text='Пропустить'/>
                            </View> 
                        </>
                        : null
                    }
                </View>

                : <Account navigation={p.navigation}
                screenProps={p.screenProps}/>
            : <Account navigation={p.navigation}
                       screenProps={p.screenProps}/>
        )
    }
}