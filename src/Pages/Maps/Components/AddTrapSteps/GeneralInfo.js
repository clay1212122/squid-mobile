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

export default function GeneralInfo({plagueOptions, cropOptions, productOptions, trapInfo, setPlagueType, plagueType}) {
    const getOptionsPlague = () => {
        const catalogsTmp = JSON.parse(JSON.stringify(plagueOptions));
        return catalogsTmp.filter(plague => {
          return (
            plague.filter.includes(trapInfo.current.product) &&
            plague.filter.includes(trapInfo.current.crop)
          );
        });
      };
    
      const getOptionsCrop = () => {
        const catalogsTmp = JSON.parse(JSON.stringify(cropOptions));
        return catalogsTmp.filter(crop => {
          return (
            crop.filter.includes(plagueType) &&
            crop.filter.includes(trapInfo.current.product)
          );
        });
      };
    
      const getOptionsProduct = () => {
        const productssssssss = JSON.parse(JSON.stringify(productOptions));
        let products = productssssssss.filter(product => {
          return (
            product.filter.includes(plagueType) &&
            product.filter.includes(trapInfo.current.crop)
          );
        });
        return products;
      };
  return (
    <>
      <Input
        containerStyle={{width: '95%'}}
        placeholder="Nombre o ubicación"
        autoComplete="off"
        autoCorrect={false}
        onChangeText={e => {
          trapInfo.current.name = e;
        }}
      />

      <Input
        containerStyle={{width: '95%'}}
        placeholder="Identificador"
        autoComplete="off"
        autoCorrect={false}
        onChangeText={e => {
          trapInfo.current.id = e;
        }}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{label: 'Plaga', value: ' '}}
        onValueChange={e => {
          trapInfo.current.plague = e;
          setPlagueType(e);
        }}
        items={plagueOptions.length > 0 ? getOptionsPlague() : []}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{label: 'Cultivo', value: ' '}}
        onValueChange={e => (trapInfo.current.crop = e)}
        items={cropOptions.length > 0 ? getOptionsCrop() : []}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{label: 'Producto', value: ' '}}
        onValueChange={e => (trapInfo.current.product = e)}
        items={productOptions.length > 0 ? getOptionsProduct() : []}
      />
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 19,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: '#B8BEC4',
      borderRadius: 4,
      color: '#B8BEC4',
      paddingRight: 30,
      width: '90%',
      alignSelf: 'center',
      marginBottom: 20,
      // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });