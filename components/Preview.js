import React from 'react'
import styles, { colors } from '../styles/index'
import {store} from '../stores/AppStore'
import { Text, View, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import {Video} from 'expo-av';

const { width, height } = Dimensions.get('window');

export default Preview = ({application, apItem, navigate, isItTiles, challengeScreen}) => {
  let currentCustomer = ''
  if(apItem) currentCustomer= JSON.parse(apItem.customer)

  return(
    <TouchableOpacity
      onPress={() => {
        if(store.userId == application.customer) {
          navigate('MyApplication', {
            application: application
          });
        } else 
        if(apItem) {
          navigate('Application', {
            application: application,
            currentCustomer: JSON.parse(apItem.customer),
            currentCustomerId: application.customer,
            currentLikesCount: apItem.likesCount
          });
        } 
        else 
        navigate('Application', {
          application: application,
        });
      }}
      style={isItTiles
          ? {margin: 1}
          : {marginBottom: 5}
      }
    >
      {application.answer
      ? <View
          style={
            {
              ...styles.preview,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center'
            }
          }
        >
          {store.renderAnswer}
        </View>
      : <View style={styles.preview}>
          {application.attachment.indexOf('mp4') > -1 ||
          application.attachment.indexOf('mov') > -1
            ? <Video
                source={{ uri: store.serverUrl + '/uploads' + application.attachment }}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode='cover'
                shouldPlay
                isLooping
                style={styles.challengeImage}
              />
            : <Image
                source={{ uri: store.serverUrl + '/uploads' + application.attachment }}
                style={styles.challengeImage}
                resizeMode="cover"/>
          }
          <Text
            style={{
              ...styles.bodyFrame,
              bottom: 5,
              left: 3,
            }}
          >
            {shorthand(store.get('challenges', application.challenge).title, 13)}
          </Text>
          {challengeScreen ?
          <View style={{...styles.profileItem,
            position: 'absolute',
            top: 10
          }}>
            <View
              style={{
                width: width,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  marginRight: 10,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#aaa',
                  backgroundColor: '#fafafa',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {currentCustomer.avatar && (
                  <ImageBackground
                    source={{ uri: store.serverUrl + '/uploads' + currentCustomer.avatar }}
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    imageStyle={{ borderRadius: 20 }}
                  ></ImageBackground>
                )}
              </View>
              <Text
                style={{
                  marginBottom: 5,
                  color: colors.white,
                  fontFamily: 'MontserratMedium',
                  fontSize: 12,
                }}
              >
                {currentCustomer.name.split(' ').slice(0, 2).join('\n')}
              </Text>
            </View>
          </View>
          : null
        }
        </View>
      }

      {application.status == 'rejected'
        ? <View
            style={{
              backgroundColor:'rgba(255, 0, 0, 0.75)',
              borderRadius: 20,
              position: 'absolute',
              top: 5,
              right: 5,
              padding: 7,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../assets/images/icon-returned.png')}
              style={styles.tabIcon}
            />
          </View>
        : null
      }
    </TouchableOpacity>
  )
}

const shorthand = (word, maxLength) => {
  if(word.length > maxLength) return word.slice(0,maxLength-1) + '…'
  else return word
}