import {useNavigation} from '@react-navigation/native';
import {Button, Input} from '@rneui/base';
import {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import { Login } from './Login';
import SignUp from './SignUp';

export default function Auth() {
  const [errorEmail, setErrorEmail] = useState('');
  const [loginSelected, setLoginSelected] = useState(true);
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View key={'imageHeader'}>
        <Image
          source={require('../../Assets/Images/Squid.png')}
          resizeMode="contain"
          style={{width: 300, height: 150}}
        />
      </View>
      <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom:'5%'}}>
          <TouchableOpacity style={{width: '35%', borderBottomWidth:1}} onPress={()=> {setLoginSelected(true)}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: '10%',
                color: loginSelected ? '#C2D829' : 'black',
                textAlign: 'center'
              }}>
              INICIO DE SESIÓN
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{width: '35%', borderBottomWidth:1, borderLeftWidth: 1}} onPress={()=> {setLoginSelected(false)}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: '10%',
                color: !loginSelected ? '#C2D829' : 'black',
                textAlign: 'center'
              }}>
              CREAR CUENTA
            </Text>
          </TouchableOpacity> */}
      </View>
      <ScrollView style={{marginTop: 10, flex:1, width: '95%'}} contentContainerStyle={{paddingBottom: 200}}>
        {loginSelected ?
         <Login/> :
         <SignUp/>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
