import {View, Text} from 'react-native';
import React, { useState } from 'react';
import {Button, Input} from '@rneui/base';

export default function AddTerrain({markers, changeStep}) {
  const [namee, setName] = useState('')
  return (
    <>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: '#C2D829',
          marginBottom: '5%',
        }}>
        Información del terreno actual.
      </Text>
      {markers.map((marker, id) => {
        return (
          
            <Input
            label={`Punto ${id + 1}`}
              containerStyle={{width: '95%'}}
              placeholder={`Longitud: ${marker.longitude
                .toString()
                .substring(0, 9)}, Latitud:${marker.latitude
                .toString()
                .substring(0, 9)}`}
              key={id}
            />
          
        );
      })}
      <Input containerStyle={{width: '95%'}} placeholder={`Nombre`} onChangeText={(e)=>{setName(e)}} />
      <Button
        onPress={() => {
          let terrain = {
            area: markers,
            nameTerrain: namee,
          };
          changeStep();
        }}
        title="Continuar"
        buttonStyle={{
          backgroundColor: '#F0B406',
          borderRadius: 5,
        }}
        titleStyle={{fontWeight: 'bold', fontSize: 23}}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
      />
    </>
  );
}
