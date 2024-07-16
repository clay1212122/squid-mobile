import {View, Text, StyleSheet} from 'react-native';
import React, { useRef, useMemo, useState, useEffect} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import AddTerrain from './Components/AddTerrain';
import AddTrap from './Components/AddTrap';
import Modal from 'react-native-modal';
import Map from './Map';
export default function OptionSaveTerrain() {
  const sheetRef = useRef();
  const snapPoints = useMemo(() => ['5%', '50%', '85%'], []);
  const [position, setPosition] = useState({
    latitud: 18.970834723718863,
    longitud: -99.21006257250195,
  });
  const [markers, setMarkers] = useState([]);
  const [area, setArea] = useState([]);
  const [timerTitle, setTimerTitle] = useState(5);
  const [steps, setSteps] = useState(1);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  useEffect(() => {
    hideTitle(4);
    
    if (markers) {
      setArea([...markers]);
    }
  }, []);

  const hideTitle = e => {
    setTimeout(() => {
      let timer = e - 1;
      if (timer <= 0) {
        setTimerTitle(timer);
        return;
      }
      hideTitle(timer);
    }, 1000);
  };

  const createMarker = e => {
    console.log(e.nativeEvent.coordinate);
    setMarkers([...markers, e.nativeEvent.coordinate]);
    setArea([...markers, e.nativeEvent.coordinate]);
  };
  const changeStep = () => {
    console.log(steps);
    setSteps(2);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          margin: '20%',
          zIndex: 50,
        }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: '#C2D829',
            display: timerTitle > 0 ? 'flex' : 'none',
            fontWeight: '900',
          }}>
          Primero da de alta un terreno
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          margin: '20%',
          zIndex: 50,
        }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: '#C2D829',
            display: timerTitle > 0 ? 'flex' : 'none',
            fontWeight: '900',
          }}>
          Primero da de alta un terreno
        </Text>
      </View>
 
          <Map
            needMarkers={true}
            needArea={true}
          />

      {/* <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {steps == 1 ? (
            <AddTerrain markers={markers} changeStep={changeStep} />
          ) : (
            <AddTrap position={position} />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
      <Modal isVisible={modalConfirmation}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '95%',
              backgroundColor: 'white',
              height: '40%',
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text>Hola</Text>
          </View>
        </View>
      </Modal> */}
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
    paddingBottom: '100%',
  },
});