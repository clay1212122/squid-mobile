import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Button} from '@rneui/base';
export default function SModal({
  isVisible,
  setIsVisible,
  message,
  funcValidate,
  funcReturn,
  twoButtons = false,
}) {
  return (
    <Modal isVisible={isVisible}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: '95%',
            backgroundColor: 'white',
            height: '23%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: '#C2D829',
              marginBottom: 25,
              marginTop: 20,
              textAlign: 'center',
            }}>
            {message}
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 10
            }}>
            <View
              style={{
                flex: 1,
                display: twoButtons ? 'flex' : 'none',
              }}>
              <Button
                onPress={async () => {
                  funcReturn();
                  setIsVisible(false);
                }}
                title="Cancelar"
                buttonStyle={{
                  backgroundColor: 'red',
                  borderRadius: 5,
                  marginHorizontal: 10,
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                onPress={async () => {
                  funcValidate();
                  setIsVisible(false);
                }}
                title="Aceptar"
                buttonStyle={{
                  backgroundColor: '#C2D829',
                  borderRadius: 5,
                  marginHorizontal: 10,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
