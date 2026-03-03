import React, { Component } from 'react';
import { View, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import { HeaderMenuItem } from './HeaderMenuItem';
import { CloseIcon } from '../Buttons/CloseIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../styles';

export class HeaderDropDownMenu extends Component {
  state = {
    showHeaderMenu: false,
    showComplainView: false,
    complainText: '',
    showComplainError: false
  };

  toggleMenu = () => {
    this.setState({ showHeaderMenu: !this.state.showHeaderMenu });
  };

  toggleComplain = () => {
    this.setState({
      showHeaderMenu: false,
      showComplainView: !this.state.showComplainView,
    });
  };

  pressBlock = async () => {
    const { store, applicationId, customerId, resCallback, isBlocked, isShowBlockButton } = this.props;
    let res;
    this.toggleMenu();
    store.loading = true;

    if (customerId) {
      res = await store.toggleBlockCustomer(customerId, !isBlocked);
    } else {
      res = await store.toggleBlockApplication(applicationId, !isBlocked);
    }

    store.loading = false;

    if (res.success) {
      const type = customerId ? 'Автор' : 'Работа';
      const act = (isBlocked ? ' вами разблокирован' : ' вами заблокирован') + (customerId ? '' : 'а');
      resCallback(type + act);
    } else {
      resCallback(res.errorMessage);
    }
  };

  pressSendComplain = () => {
    let { complainText } = this.state;
    complainText = complainText.trim();

    if (complainText.length === 0) {
      this.setState({ showComplainError: true });
      return;
    }

    this.setState({ showComplainError: false }, async () => {
      const { store, applicationId, customerId, resCallback } = this.props;
      let res;
      this.toggleComplain();
      store.loading = true;

      if (customerId) {
        res = await store.complaintsCustomer(customerId, complainText);
      } else {
        res = await store.complaintApplication(applicationId, complainText);
      }

      store.loading = false;
      this.setState({ complainText: '' });

      if (res.success) {
        resCallback('Жалоба принята и будет рассмотрена модераторами');
      } else {
        resCallback(res.errorMessage);
      }
    });
  };

  render() {
      return (
        <View>
          <TouchableOpacity onPress={this.toggleMenu}>
            <Icon size={24} color="black" name="more-vert" />
          </TouchableOpacity>
          {this._renderMenuView()}
          {this._renderComplainView()}
        </View>
      );
  }

  _renderMenuView()
  {
      if (this.props.isShowBlockButton)
      {
        return (
          <Modal animationType="fade" transparent={true} visible={this.state.showHeaderMenu} onRequestClose={this.toggleMenu}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CloseIcon onPress={this.toggleMenu} />
              <View
                style={{
                  backgroundColor: 'white',
                  width: '70%',
                  paddingBottom: 5,
                }}
              >
                <HeaderMenuItem onPress={this.toggleComplain} text={'Пожаловаться'} />
                <HeaderMenuItem onPress={this.pressBlock} text={this.props.isBlocked ? 'Разблокировать' : 'Заблокировать'}/>
              </View>
            </View>
          </Modal>
        );
    } else
    {
        return (
        <Modal animationType="fade" transparent={true} visible={this.state.showHeaderMenu} onRequestClose={this.toggleMenu}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CloseIcon onPress={this.toggleMenu} />
            <View
              style={{
                backgroundColor: 'white',
                width: '70%',
                paddingBottom: 5,
              }}
            >
              <HeaderMenuItem onPress={this.toggleComplain} text={'Пожаловаться'} />
            </View>
          </View>
        </Modal>
        );
    }
  }

  _renderComplainView() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.state.showComplainView} onRequestClose={this.toggleComplain}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CloseIcon onPress={this.toggleComplain} />
          <View
            style={{
              backgroundColor: 'white',
              width: '70%',
              minHeight: 100,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'MontserratSemiBold',
                color: colors.main,
                marginBottom: 10,
              }}
            >
              Опишите причину жалобы
            </Text>
            <TextInput
              multiline
              numberOfLines={3}
              value={this.state.complainText}
              onChangeText={(complainText) => this.setState({ complainText })}
              style={{
                borderWidth: 1,
                borderColor: colors.textGray,
                borderRadius: 3,
                padding: 5,
                textAlignVertical: 'top',
                marginBottom: 10,
              }}
            />
            {this.state.showComplainError ? (
              <Text
                style={{
                  fontSize: 12,
                  color: colors.red,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}
              >
                Заполните описание жалобы
              </Text>
            ) : null}
            <TouchableOpacity
              style={{
                minWidth: 100,
                alignItems: 'center',
                backgroundColor: colors.main,
                borderRadius: 5,
                padding: 10,
              }}
              onPress={this.pressSendComplain}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 14,
                }}
              >
                Пожаловаться
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
