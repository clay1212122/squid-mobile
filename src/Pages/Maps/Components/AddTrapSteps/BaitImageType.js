import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Button, Input, CheckBox} from '@rneui/base';
import {useSelector, useDispatch} from 'react-redux';
import {addTerrain} from '../../../Stores/TerrainStore';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {axiosCliente} from '../../../Api/Axios';
import { useNavigation } from '@react-navigation/native';


export default function BaitImageType() {
  return (
    <>
         <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
          <CheckBox
            checked={true}
            containerStyle={{flex: 1}}
            onIconPress={() => {
              setBaitType(pastValue => ({
                ...pastValue,
                maza: !pastValue.maza
              }));
              trapInfo.current = trapInfo.current
            }}
            size={25}
            textStyle={{fontSize: 15}}
            title="Malaza /   Agra"
          />
          <CheckBox
            checked={true}
            containerStyle={{flex: 1}}
            onIconPress={() => {}}
            size={25}
            textStyle={{fontSize: 15}}
            title="Vegetal / Insecticida"
            titleProps={{}}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
          <CheckBox
            checked={true}
            containerStyle={{flex: 1, marginTop: 15}}
            onIconPress={() => {}}
            size={25}
            textStyle={{fontSize: 15}}
            title="Agua / Jabón"
            titleProps={{}}
          />
          <CheckBox
            checked={true}
            containerStyle={{flex: 1}}
            onIconPress={() => {}}
            size={25}
            textStyle={{fontSize: 15}}
            title={
              <Input
                placeholder="Otro"
                autoComplete="off"
                autoCorrect={false}
                onChangeText={e => {
                  trapInfo.current.id = e;
                }}
              />
            }
            titleProps={{}}
          />
        </View>
        <Button
          onPress={async () => await uploadPhoto()}
          title="Añadir imagen"
          buttonStyle={{
            backgroundColor: '#C2D829',
            borderRadius: 5,
          }}
        />
    </>
  )
}