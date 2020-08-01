import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Login, Signup, SplashScreen} from './Pages';
import {
  Main,
  Profile,
  Messages,
  Blog,
  Forum,
  Signout,
  AddProducts,
} from './Drawermenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="SignOut" component={Signout} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Forum" component={Forum} />
      <Drawer.Screen name="Blog" component={Blog} />
      <Drawer.Screen name="Add Products" component={AddProducts} />
    </Drawer.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen
          name="Splashscreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerMenu"
          component={DrawerMenu}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
