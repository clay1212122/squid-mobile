import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {Button, Input} from '@rneui/base';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { axiosCliente } from '../../Api/Axios';
const KeepTrackTrap = ({route, navigation}) => {
    
  const {trap} = route.params
  const [sexear, setSexear] = useState(true);
  const [cebo, setCebo] = useState(true);
  const [image, setImage] = useState(null);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [hembras, setHembras] = useState(null);
  const [machos, setMachos] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const uploadPhoto = async () => {
    let response = await launchImageLibrary({
      quality: 1,
      includeBase64: true,
      saveToPhotos: true,
    });
    setImage(response.assets[0].base64);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center', marginBottom: 200}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text>Regresar</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: '#C2D829',
              marginBottom: 20,
            }}>
            Seguimiento de la trampa
          </Text>
        </View>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{label: 'Sexear', value: true}}
          onValueChange={value => {
            setSexear(value);
          }}
          items={[
            {label: 'No', value: true},
            {label: 'Si', value: false},
          ]}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Input
            containerStyle={{width: '45%'}}
            placeholder={'Machos'}
            disabled={sexear}
            onChangeText={(e)=> setMachos(e)}
            keyboardType="numeric"
          />
          <Input
            containerStyle={{width: '45%'}}
            placeholder={'Hembras'}
            onChangeText={(e)=> setHembras(e)}
            disabled={sexear}
            keyboardType="numeric"
          />
        </View>

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{label: 'Se relleno de cebo', value: true}}
          onValueChange={value => {
            setCebo(value);
          }}
          items={[
            {label: 'No', value: true},
            {label: 'Si', value: false},
          ]}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Input
            onChangeText={(e)=> setComentarios(e)}
            containerStyle={{width: '95%'}}
            placeholder={'Agregar comentario'}
            disabled={cebo}
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
      </ScrollView>
      <Button
      onPress={async()=> {
        trap[0].track_info.push({
            track_date: new Date(),
            sexearBool: sexear,
            hembras: hembras,
            machos: machos,
            comentarios: comentarios
        })
        console.log(trap[0]);
        try {
            let trapSave = trap[0]
            let res = await axios.post('http://192.168.100.6:3000/trap/update', trapSave);
            setModalConfirmation(true)
            return res;
            
          } catch (error) {
            console.log(error);
          }
      }}
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
      <Modal isVisible={modalConfirmation}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '95%',
              backgroundColor: 'white',
              height: '20%',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#C2D829',
                marginBottom: 20,
                textAlign: 'center',
              }}>
              La información se guardo de manera correcta.
            </Text>
            <Button
              onPress={async () => setModalConfirmation(false)}
              title="Aceptar"
              buttonStyle={{
                backgroundColor: '#C2D829',
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default KeepTrackTrap;

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
