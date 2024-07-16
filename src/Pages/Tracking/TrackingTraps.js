import {View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { axiosCliente } from '../../Api/Axios';
import { UserStore } from '../../Stores/User';
export default function TrackingTraps() {
  const [data, setData] = useState([]);
  const userStore = UserStore();
  const [refreshing, setRefresing] = useState(false);
  useEffect(() => {
    console.log('xd');
   setTraps();
  }, []);

  const navigation = useNavigation();

  const setTraps = async ()=> {
    getTraps().then(traps => {
      setData(traps);
      setRefresing(false);
    });
  }

  const getTraps = async () => {
    setRefresing(true);
    const traps = await axiosCliente.get('trap', {params: {institution: userStore.user.institution}});
    return traps.data;
  };
  const getDetailTrap = async (id) => {
    const trap = await axiosCliente.post('trap/detail', null, {
      params: {
        id
      }
    })
    navigation.navigate('DetailTrapTracking', {
      trap: trap.data
    });
  }
  const Item = ({id, date, name}) => {
    let trackDate = moment(date);
    let actualDate = moment(new Date());
    let difference = actualDate.diff(trackDate, 'days');
    let backgroundColorTracking = 'green';
    if (difference >= 10) {
      backgroundColorTracking = '#f1c40f';
    }
    if (difference > 15) {
      backgroundColorTracking = '#c0392b';
    }
    return (
      <TouchableOpacity style={styles.item} onPress={()=> getDetailTrap(id)}>
        <View style={{flex: 2}}>
          <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 15}}>
            Días sin seguimiento
          </Text>
          <View
            style={{
              backgroundColor: backgroundColorTracking,
              alignSelf: 'center',
              justifyContent: 'center',
              width: '30%',
              height: 35,
              marginTop: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: '900',
                fontSize: 20,
              }}>
              {difference}
            </Text>
          </View>
        </View>
        <View style={{flex: 4}}>
          <Text style={{fontWeight: '900', fontSize: 15}}>
            IDENTIFICADOR Y NOMBRE
          </Text>
          <Text style={{fontSize: 15, marginTop: 5, fontWeight: '500'}}>{id}</Text>
          <Text style={{fontWeight: '500'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: 'red', minHeight: 70}}
        refreshing={refreshing}
        onRefresh={setTraps}
        data={data}
        renderItem={({item}) => (
          <Item id={item._id} date={item.track_date} name={item.name} />
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: '#f4f6f6',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
  },
});
