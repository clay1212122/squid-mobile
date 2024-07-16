import {useNavigation} from '@react-navigation/native';
import {Button, Input, CheckBox, Icon} from '@rneui/base';
import {useState} from 'react';
import axios from 'axios';
import {Linking} from 'react-native';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {axiosCliente} from '../../Api/Axios';

export default function SignUp() {
  const [errorEmail, setErrorEmail] = useState('');
  const [checkedShoppingCode, setCheckedShoppingCode] = useState(false);
  const [termsConditions, setTermsConditions] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [formValues, setFormValues] = useState({});

  const signUpAxios = async () => {
    try {
      console.log(formValues);
      let res = await axiosCliente.post('user', formValues);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', paddingBottom: '20%'}}>
      <View key={'form'} style={{flex: 2, alignItems: 'center'}}>
        <View key={'inputs'} style={{width: '100%'}}>
          <Input
            key={'nombre'}
            placeholder="Nombre"
            errorStyle={{color: 'red'}}
            label={'Nombre'}
            onChangeText={e => {
              setFormValues(prevState => ({
                ...prevState,
                name: e,
              }));
            }}
            errorMessage={errorEmail}
            inputContainerStyle={{width: '100%'}}
          />
          <Input
            key={'apellidos'}
            placeholder="Apellidos"
            errorStyle={{color: 'red'}}
            label={'Apellidos'}
            errorMessage={errorEmail}
            onChangeText={e => {
              setFormValues(prevState => ({
                ...prevState,
                lastName: e,
              }));
            }}
            inputContainerStyle={{width: '100%'}}
          />
          <Input
            key={'Telefono'}
            placeholder="7772275673"
            errorStyle={{color: 'red'}}
            label={'Teléfono'}
            textContentType="telephoneNumber"
            errorMessage={errorEmail}
            inputContainerStyle={{width: '100%'}}
            onChangeText={e => {
              setFormValues(prevState => ({
                ...prevState,
                phoneNumber: e,
              }));
            }}
          />
          <Input
            key={'email'}
            placeholder="correo@gmail.com"
            label={'Correo electrónico'}
            errorStyle={{color: 'red'}}
            autoCapitalize="none"
            errorMessage={errorEmail}
            inputContainerStyle={{width: '100%'}}
            onChangeText={e => {
              setFormValues(prevState => ({
                ...prevState,
                email: e,
              }));
            }}
          />
          <Input
            key={'clave'}
            placeholder="Contraseña"
            errorStyle={{color: 'red'}}
            label={'Contraseña'}
            secureTextEntry={secureTextEntry}
            rightIcon={
              secureTextEntry ? (
                <Icon
                  name="visibility"
                  onPress={() => setSecureTextEntry(false)}
                  size={20}
                />
              ) : (
                <Icon
                  name="visibility-off"
                  onPress={() => setSecureTextEntry(true)}
                  size={20}
                />
              )
            }
            onChangeText={e => {
              setFormValues(prevState => ({
                ...prevState,
                password: e,
              }));
            }}
            errorMessage={errorEmail}
            inputContainerStyle={{width: '100%'}}
          />
          <CheckBox
            checked={checkedShoppingCode}
            containerStyle={{width: '75%'}}
            onIconPress={() => {
              setCheckedShoppingCode(!checkedShoppingCode);
            }}
            size={30}
            textStyle={{fontSize: 20}}
            title="¿Tienes un código de compra?"
          />
          <Input
            key={'code'}
            placeholder="Código de compra"
            errorStyle={{color: 'red'}}
            disabled={!checkedShoppingCode}
            errorMessage={errorEmail}
            inputContainerStyle={{width: '95%'}}
            onChangeText={e => {
              setFormValues(prevState => ({
                ...prevState,
                shoppingCode: e,
              }));
            }}
          />
          <CheckBox
            checked={termsConditions}
            containerStyle={{width: '75%'}}
            onIconPress={() => {
              setTermsConditions(!termsConditions);
              let valueTermsConditions = !termsConditions;
              setFormValues(prevState => ({
                ...prevState,
                termsConditions: valueTermsConditions,
              }));
            }}
            size={30}
            textStyle={{fontSize: 20}}
            title="Al crear mi cuenta estoy de acuerdo con: "
            titleProps={{}}
          />
          <Text
            onPress={() => {
              Linking.openURL(
                'https://squid-biological.com/aviso-de-privacidad',
              );
            }}
            style={{
              textDecorationLine:'underline',
              fontSize: 20,
              marginLeft: 50,
            }}>{`\u2022 Politica de privacidad y datos`}</Text>
          <Text
            onPress={() => {
              Linking.openURL(
                'https://squid-biological.com/aviso-de-privacidad',
              );
            }}
            style={{
              textDecorationLine:'underline',
              fontSize: 20,
              marginLeft: 50,
              marginBottom: 30,
            }}>{`\u2022 Terminos y condiciones`}</Text>
        </View>

        <Button
          title={'Crear cuenta'}
          size="lg"
          color={'#F0B406'}
          onPress={async () => {
            await signUpAxios();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
