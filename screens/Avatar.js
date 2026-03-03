import React from 'react';
import styles, { colors } from '../styles/index';
import { Text, View, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { observer } from 'mobx-react';
import { store } from '../stores/AppStore'

@observer
export default class Avatar extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }

  _pickImage = async () => {
    
    try {
      store.loading = true
      let localUri = await store.takePhotoAndUpload();
      
      if(!localUri) throw("Image is not picked")
      
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('action', 'upload-file');
      formData.append('file', { uri: localUri, name: filename, type });

      const response = await fetch(store.apiUrl, {
        method: 'POST',
        body: formData,
        header: {
          'content-type': 'multipart/form-data',
        },
      });
      if (response.ok) {
        const fileReq = await response.json();
        if (fileReq.success && fileReq.data.src) {
          let attachmentSrc = fileReq.data.src;
          let result = await store.apiCall('change-customer', {
            id: store.userId,
            avatar: attachmentSrc,
          });
          if (result) {
            store.avatar = attachmentSrc;
          }
        }
      }
      
    } catch (e) {
      console.log(e)
    }
    store.loading = false;
  };

  render() {
    const p = this.props;
    const { navigate, goBack } = p.navigation;
    // const store = p.screenProps;

    let image = store.avatar;

    return (
      <View style={styles.accountLayout}>
        <View style={styles.settingsHeader}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.headerTitle}>Фото профиля</Text>
          <View style={{ flex: 1, marginRight: 36 }}></View>
        </View>
        <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'handled'}
        >
          <TouchableOpacity
            style={{
              height: 250,
              width: 250,
              borderRadius: 150,
              borderWidth: 1,
              borderColor: '#044260',
              backgroundColor: '#fafafa',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this._pickImage}
          >
            {store.avatar && (
              <ImageBackground
                source={{ uri: store.avatar.indexOf('http') > -1 
                  ? store.avatar 
                  : store.serverUrl + '/uploads/' + store.avatar }}
                style={{
                  width: 250,
                  height: 250,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{ borderRadius: 150 }}
              >
                <Text
                  style={{
                    fontSize: 60,
                    color: '#ddd',
                  }}
                >
                  +
                </Text>
              </ImageBackground>
            )}

            {!image && (
              <Text
                style={{
                  fontSize: 60,
                  color: '#044260',
                }}
              >
                +
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
