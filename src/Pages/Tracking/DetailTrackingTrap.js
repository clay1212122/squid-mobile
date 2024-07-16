import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/base';
import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';
import { axiosCliente } from '../../Api/Axios';
const DetailTrackingTrap = ({route, navigation}) => {
  const {trap} = route.params;
  const [imageTrap, setImage] = useState('');
  useEffect(() => {
    getImage().then(image => {
      setImage(image);
    });
  }, []);

  const getImage = async () => {
    try {
      const image = await axiosCliente.post('trap/image',
        null,
        {
          params: {id: route.params.trap[0]._id},
        },
      );
      return image.data;
    } catch (error) {
      console.log('error imagen');
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center', marginBottom: 200}}>

        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=> {navigation.goBack()}}>
            <Text>Regresar</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#C2D829',
            marginBottom: 20,
          }}>
          Información de la trampa:
        </Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#C2D829',
            marginBottom: 20,
          }}>
          {trap[0].name}
        </Text>
        <Input
          containerStyle={{width: '95%'}}
          placeholder={trap[0].longitud}
          disabled={true}
        />
        <Input
          containerStyle={{width: '95%'}}
          placeholder={trap[0].latitude}
          disabled={true}
        />

        <Input
          containerStyle={{width: '95%'}}
          placeholder="Identificador"
          value={trap[0]._id}
        />

        <Input
          containerStyle={{width: '95%'}}
          placeholder="Observaciones"
          value={trap[0].observations}
        />

        <Input
          containerStyle={{width: '95%'}}
          placeholder="Dirección"
          value={trap[0].direction}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{label: trap[0].trap_type, value: null}}
          onValueChange={() => {
            console.log('x');
          }}
          items={[]}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{label: trap[0].crop_type, value: null}}
          onValueChange={() => {
            console.log('x');
          }}
          items={[]}
        />
        {imageTrap != '' ? (
          <View>
            <Image
              resizeMode="contain"
              style={{width: 300, height: 300,}}
              source={{uri: 'data:image/png;base64,' + imageTrap}}
            />
          </View>
        ) : (
         <Text>Gola</Text>
        )}
        <TouchableOpacity onPress={()=> {navigation.navigate('KeepTrackTrap', {
            trap: trap
        })}}>
            <Text>DAR SEGUIMIENTO</Text>
        </TouchableOpacity>
      </ScrollView>
      <Button
        title="Guardar"
        buttonStyle={{
          backgroundColor: '#F0B406',
          borderRadius: 5,
        }}
        titleStyle={{fontWeight: 'bold', fontSize: 23}}
        containerStyle={{
            alignSelf: 'center',
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default DetailTrackingTrap;

const styles = StyleSheet.create({});

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
