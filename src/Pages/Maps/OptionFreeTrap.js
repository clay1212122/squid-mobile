import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Map from './Map';
import React, {useRef, useMemo, useState, useEffect} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AddTrap from './Components/AddTrap';
import GetLocation from 'react-native-get-location';
import Modal from 'react-native-modal';
import {Button, Icon, Input} from '@rneui/base';
import RNPickerSelect from 'react-native-picker-select';
import { UserStore } from '../../Stores/User';
export default function OptionFreeTrap() {
  const sheetRef = useRef();
  const snapPoints = useMemo(() => ['5%', '50%', '90%'], []);
  const userStore = UserStore();
  const [position, setPosition] = useState();
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [mapStyle, setMapStyle] = useState('standard');
  const [showMapStyle, setShowMapStyle] = useState(false)

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Map mapForm={mapStyle} setFreePosition={setPosition}/>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: '10%',
          right: 5,
          alignItems: 'center',
        }}>
        <Icon
          name="layers"
          onPress={()=> {setShowMapStyle(!showMapStyle)}}
          type="material"
          containerStyle={{
            backgroundColor: '#F0B406',
            borderRadius: 10,
            padding: 5,
            width: 50,
            height: 35,
          }}
          color={'white'}
        />
        <View style={{display: showMapStyle ? 'flex': 'none'}}>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{label: 'Estandar', value: 'standard'}}
            onValueChange={value => {
              setMapStyle(value);
              setShowMapStyle(false)
            }}
            items={[
              {label: 'Satelite', value: 'satellite'},
              {label: 'Hibrido', value: 'hybrid'},
              {label: 'Terreno', value: 'mutedStandard'},
            ]}
          />
        </View>
      </TouchableOpacity>
      <View style={{position: 'absolute', bottom: '12%', left: '5%'}}>
        <Button
          title="Colocar"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={{
            backgroundColor: '#F0B406',
            borderRadius: 5,
          }}
          titleStyle={{fontWeight: 'bold', fontSize: 23}}
          containerStyle={{
            height: 50,
            width: 120,
          }}
          onPress={() => sheetRef.current.snapToIndex(2)}
        />
      </View>

      <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {position ? (
            <AddTrap
              position={position}
              freeTrap={true}
              setModalConfirmation={setModalConfirmation}
            />
          ) : null}
        </BottomSheetScrollView>
      </BottomSheet>
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
              La trampa se guardo de manera correcta.
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 19,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#F0B406',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, .7)',
    color: '#F0B406',
    paddingRight: 30,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10
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
