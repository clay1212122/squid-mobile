import { View, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapView, { Marker, Overlay, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import Svg, { ClipPath, Defs, Circle, Rect, Text, Image, Polygon as SPolygon } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
import SvgPanZoom, { SvgPanZoomElement } from 'react-native-svg-pan-zoom';
import ScrollableImage from '../../Components/ScrollableImage';
export default function Map({ navigation, needMarkers, needArea, mapForm = 'standard', setFreePosition = () => { } }) {

  const mapRef = useRef(null);
  const polygonRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [area, setArea] = useState([]);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState('');
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      //18.970834723718863, -99.21006257250195
      .then(location => {
        console.log('Location', location);
        setPosition({
          latitud: location.latitude,
          longitud: location.longitude,
        });
        setFreePosition({
          latitud: location.latitude,
          longitud: location.longitude,
        });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
    if (markers) {
      setArea([...markers]);
    }
  }, []);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: true }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const createMarker = e => {
    let newPosition = points;
    markers.length
    let newMarker = {
      id: markers.length,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    }

    if (!markers.includes(e.nativeEvent.coordinate)) {
      setMarkers([...markers, newMarker]);
      setArea([...markers, newMarker]);
    }

    newPosition += `${e.nativeEvent.position.x},${e.nativeEvent.position.y} `;
    setPoints(newPosition);
    console.log(newPosition);
  };

  const updateMarker = (id, newposition) => {
    let newMarkers = markers.map(marker => {
      if (marker.id == id) {
        return { id: id, latitude: newposition.nativeEvent.coordinate.latitude, longitude: newposition.nativeEvent.coordinate.longitude }
      } else {
        return marker;
      }
    });
    setMarkers(newMarkers);
    setArea(newMarkers);
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {position ? (
        <MapView
          ref={mapRef}
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={mapForm}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          zoomControlEnabled={true}
          // initialRegion={{
          //   latitude: position.latitud,
          //   longitude: position.longitud,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsScale={true}
          scrollEnabled={true}
          minZoomLevel={19}
          cameraZoomRange={19}
          onPress={e => createMarker(e)}>
          <Marker
            key={'1'}
            coordinate={{
              latitude: position.latitud,
              longitude: position.longitud,
            }}
            title={'Posición actual'}
            description={''}

          >
            {/* <Image source={require('../../Assets/Images/IconTrap.png')} style={{ height: 80, width: 80 }} /> */}

          </Marker>
          {needMarkers ? markers.map((marker, id) => {
            return (
              <Marker
                key={id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={`Marcador ${id + 1}`}
                description="Trampa"
                draggable
                onDragEnd={(newposition) => { updateMarker(id, newposition) }}
                tracksInfoWindowChanges={false}
                tracksViewChanges={false}
              />
            );
          }) : null}
          {needArea ? area.length >= 3 ? (
            <>
              <Polygon
                coordinates={markers}
                fillColor="rgba(0,0,0,0.5)" // Set a semi-transparent fill color
                strokeColor="rgba(0,0,0,1)"
                strokeWidth={6}
              >
              </Polygon>
            </>

          ) : null : null}

        </MapView>
      ) : null}

      <ScrollableImage
      width={width}
      height={height}
      points={points}
      image={require('../../Assets/Images/fishnet.png')}
      />
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
