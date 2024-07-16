import {useNavigation} from '@react-navigation/native';
import {Button, Input} from '@rneui/base';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import { axiosCliente } from '../../Api/Axios';
import { UserStore } from '../../Stores/User';

export function Login({}) {
  const navigation = useNavigation();
 const userStore = UserStore();
  const [formValues, setFormValues] = useState({role:'Operator'})
  const [errorEmail, setErrorEmail] = useState('');
  const [error, setError] = useState('')
  const login = async ()=> {
    try {
      // let res = await axiosCliente.post('user/login', formValues);
      // console.log(res.data);
      // if (res.data.success) {
        // userStore.setUser(res.data.body.data);
        // userStore.setLogged(true);
        // setError('');
        navigation.navigate('UserNavigation')
      // }else{
      //   setError(res.data.body.details)
      // }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 5, color:'red', textAlign:'center'}}>{error}</Text>
      <View key={'form'} style={{flex: 2, alignItems: 'center'}}>
        <View key={'inputs'} style={{width: '100%'}}>
          <Input
            key={'email'}
            placeholder="correo@gmail.com"
            label={'Correo electrónico'}
            errorStyle={{color: 'red'}}
            errorMessage={errorEmail}
            autoCapitalize='none'
            onChangeText={(e)=>{
              setFormValues((pastValue)=> ({
                ...pastValue,
                email:e
              }))
            }}
            autoComplete='off'
            inputContainerStyle={{width: '100%', marginBottom: '7%'}}
          />
          <Input
            key={'password'}
            placeholder="Contraseña"
            errorStyle={{color: 'red'}}
            label={'Contraseña'}
            autoComplete='off'
            secureTextEntry={true}
            onChangeText={(e)=>{
              setFormValues((pastValue)=> ({
                ...pastValue,
                password:e
              }))
            }}
            errorMessage={errorEmail}
            inputContainerStyle={{width: '100%', marginBottom: '7%'}}
          />
        </View>

        <Button
          title={'Ingresar'}
          size="lg"
          color={'#F0B406'}
          onPress={async () => {
           await login();
          }}
        />
        <Text
          style={{
            color: '#C2D829',
            marginTop: '10%',
            fontSize: 18,
            fontWeight: '900',
          }}>
          ¿Olvidaste tu contraseña?
        </Text>
        <TouchableOpacity
          onPress={() => {
            
            navigation.navigate('SignUp');
          }}>
        </TouchableOpacity>
      </View>
    </View>
  );
}
