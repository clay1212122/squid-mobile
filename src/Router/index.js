import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../Pages/Authentication/Login';
import Map from '../Pages/Maps/Map';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OptionSaveTerrain from '../Pages/Maps/OptionSaveTerrain';
import OptionFreeTrap from '../Pages/Maps/OptionFreeTrap';
import TrackingTraps from '../Pages/Tracking/TrackingTraps';
import DetailTrackingTrap from '../Pages/Tracking/DetailTrackingTrap';
import KeepTrackTrap from '../Pages/Tracking/KeepTrackTrap';
import SignUp from '../Pages/Authentication/SignUp';
import Auth from '../Pages/Authentication/Auth';
import {useNavigation} from '@react-navigation/native';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message

const Drawer = createDrawerNavigator();

function UserNavigation() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
    theme={MyTheme}
    initialRouteName="Opción libre"
    screenOptions={{
      lazy: true
    }}
    >
      <Drawer.Screen name="Opción libre" component={OptionFreeTrap} />
      <Drawer.Screen name="Opción terreno" component={OptionSaveTerrain} />
      <Drawer.Screen name="Mis terrenos" component={Map} />
      <Drawer.Screen name="Mis trampas" component={TrackingTraps} />
      <Drawer.Screen name="Cerrar sesión"  children={()=>navigation.navigate('Auth')} />
    </Drawer.Navigator>
  );
}

export default function IndexNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name='DetailTrapTracking' component={DetailTrackingTrap}/>
        <Stack.Screen name='KeepTrackTrap' component={KeepTrackTrap} />
        <Stack.Screen name='UserNavigation' component={UserNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
