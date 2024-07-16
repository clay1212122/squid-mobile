import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Button, Input, CheckBox } from '@rneui/base';
import { useSelector, useDispatch } from 'react-redux';
import { addTerrain } from '../../../Stores/TerrainStore';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { axiosCliente } from '../../../Api/Axios';
import { useNavigation } from '@react-navigation/native';
import SModal from '../../../Components/Modal';
import { UserStore } from '../../../Stores/User';
export default function AddTrap({ position, freeTrap, setModalConfirmation }) {
  const navigation = useNavigation();
  const [plagueType, setPlagueType] = useState(' ');
  const [plagueOptions, setPlagueOptions] = useState([]);
  const [cropOptions, setCropOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [infoTrap, setInfoTrap] = useState(null);
  const [baitType, setBaitType] = useState({
    maza: false,
    vegetal: false,
    agua: false,
    other: {
      value: '',
      active: false,
    },
  });
  const [moreInfo, setMoreInfo] = useState(false);
  const [modal, setModal] = useState(false);
  const userStore = UserStore();
  const trapInfo = useRef({
    name: '',
    longitud: position.longitud.toString(),
    latitude: position.latitud.toString(),
    crop: ' ',
    product: ' ',
    plague: ' ',
    image: '',
    id: ' ',
    bait: ' ',
    institution: userStore.user.institution,
  });

  const uploadPhoto = async () => {
    let response = await launchImageLibrary({
      quality: 1,
      includeBase64: true,
      saveToPhotos: true,
    });
    console.log(response);
    setImage(response.assets[0].base64);
  };
  const savefreeTrap = async () => {
    try {

      console.log("info", infoTrap);
      let res = await axiosCliente.post('trap/save', infoTrap);
      console.log(res.data);
      setModal(false);
      navigation.navigate('Mis trampas');
    } catch (error) {
      console.log(error);
    }
  };

  const getCrops = async () =>
    (await axiosCliente.get('catalogs/type', { params: { type: 'crop' } })).data
      .body.data;
  const getPlagues = async () =>
    (await axiosCliente.get('catalogs/type', { params: { type: 'plague' } })).data
      .body.data;
  const getProducts = async () =>
    (await axiosCliente.get('catalogs/type', { params: { type: 'product' } })).data
      .body.data;

  useEffect(() => {
    Promise.all([getCrops(), getPlagues(), getProducts()]).then(values => {
      setPlagueOptions(values[1]);
      setCropOptions(values[0]);
      setProductOptions(values[2]);
    });
  }, []);

  const validateState = () => {
    if (trapInfo.current.plague != ' ') {
      setInfoTrap(JSON.parse(JSON.stringify(trapInfo.current)));
    }
  };

  useEffect(() => {
    validateState();
  }, [plagueType, baitType]);

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
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#C2D829',
            marginBottom: 20,
          }}>
          Información General.
        </Text>
        <Input
          containerStyle={{ width: '95%' }}
          placeholder="Nombre o ubicación"
          autoComplete="off"
          autoCorrect={false}
          onChangeText={e => {
            trapInfo.current.name = e;
          }}
        />

        <Input
          containerStyle={{ width: '95%' }}
          placeholder="Identificador"
          autoComplete="off"
          autoCorrect={false}
          onChangeText={e => {
            trapInfo.current.id = e;
          }}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Plaga', value: ' ' }}
          onValueChange={e => {
            trapInfo.current.plague = e;
            setPlagueType(e);
          }}
          items={plagueOptions.length > 0 ? getOptionsPlague() : []}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Cultivo', value: ' ' }}
          onValueChange={e => (trapInfo.current.crop = e)}
          items={cropOptions.length > 0 ? getOptionsCrop() : []}
        />

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Producto', value: ' ' }}
          onValueChange={e => (trapInfo.current.product = e)}
          items={productOptions.length > 0 ? getOptionsProduct() : []}
        />

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
          <CheckBox
            checked={baitType.maza}
            containerStyle={{ flex: 1 }}
            onIconPress={() => {
              trapInfo.current.bait = 'malaza';
              validateState();
              setBaitType(past => ({
                maza: !past.maza,
                vegetal: false,
                agua: false,
                other: {
                  value: '',
                  active: false,
                },
              }));
            }}
            size={25}
            textStyle={{ fontSize: 15 }}
            title="Malaza /   Agra"
          />
          <CheckBox
            checked={baitType.vegetal}
            containerStyle={{ flex: 1 }}
            onIconPress={() => {
              trapInfo.current.bait = 'vegetal';
              validateState();
              setBaitType(past => ({
                maza: false,
                vegetal: !past.vegetal,
                agua: false,
                other: {
                  value: '',
                  active: false,
                },
              }));
            }}
            size={25}
            textStyle={{ fontSize: 15 }}
            title="Vegetal / Insecticida"
            titleProps={{}}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <CheckBox
            checked={baitType.agua}
            containerStyle={{ flex: 1, marginTop: 15 }}
            onIconPress={() => {
              trapInfo.current.bait = 'agua';
              validateState();
              setBaitType(past => ({
                maza: false,
                vegetal: false,
                agua: !past.agua,
                other: {
                  value: '',
                  active: false,
                },
              }));
            }}
            size={25}
            textStyle={{ fontSize: 15 }}
            title="Agua / Jabón"
            titleProps={{}}
          />
          <CheckBox
            checked={baitType.other.active}
            containerStyle={{ flex: 1 }}
            onIconPress={() => {
              validateState();
              setBaitType(past => ({
                maza: false,
                vegetal: false,
                agua: false,
                other: {
                  value: '',
                  active: !past.other.active,
                },
              }));
            }}
            size={25}
            textStyle={{ fontSize: 15 }}
            title={
              <Input
                placeholder="Otro"
                autoComplete="off"
                autoCorrect={false}
                onChangeText={e => {
                  trapInfo.current.bait = e;
                }}
              />
            }
            titleProps={{}}
          />
        </View>
        <View style={{ width: '100%', display: moreInfo ? 'flex' : 'none' }}>
          <Input
            label={'Longitud'}
            containerStyle={{ width: '95%' }}
            placeholder={position.longitud.toString()}
            disabled={true}
          />
          <Input
            label={'Latitud'}
            containerStyle={{ width: '95%' }}
            placeholder={position.latitud.toString()}
            disabled={true}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Button
              onPress={async () => await uploadPhoto()}
              title="Imagen"
              buttonStyle={{
                backgroundColor: '#C2D829',
                borderRadius: 5,
                marginHorizontal: 10,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={async () => {
                validateState();
                setMoreInfo(!moreInfo);
              }}
              title="Ver más"
              buttonStyle={{
                backgroundColor: '#C2D829',
                borderRadius: 5,
                marginHorizontal: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>

      <Button
        onPress={async () => {
          // if (freeTrap) {
          //   await savefreeTrap();
          //   setModalConfirmation(true);
          // } else {
          //   saveTerrain();
          // }
          trapInfo.current.latitude = position.latitud.toString();
          trapInfo.current.longitud = position.longitud.toString();
          validateState();
          setModal(true);
          console.log(infoTrap);
          
        }}
        title="Guardar"
        buttonStyle={{
          backgroundColor: '#F0B406',
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
      />
      <SModal
        isVisible={modal}
        setIsVisible={setModal}
        twoButtons={true}
        funcReturn={() => {
          validateState();
        }}
        funcValidate={() => {
          validateState();
          savefreeTrap();
        }}
        message={`¿Deseas guardar la trampa ${infoTrap ? infoTrap.id : ''}?`}
      />
    </View>
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
