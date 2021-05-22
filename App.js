import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import AddScreen from './screens/AddScreen';
import NotesStack from './screens/NotesStack';
import NotesScreen from './screens/NotesScreen';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

 function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen 
        name="Notes App" 
        component={NotesStack} 
        options={{
          title: 'Notes App',
          headerStyle: {
            height: 100,
            backgroundColor: '#f4511e',
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
      <MainStack.Screen 
        name="Note Detail" 
        component={NotesScreen} 
        options={{
          title: 'Note Detail',
          headerStyle: {
            height: 100,
            backgroundColor: '#f4511e',
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen 
        name="AddScreen" 
        component={AddScreen} 
        options={{
          title: 'New Note',
          headerStyle: {
            height: 100,
            backgroundColor: '#f4511e',
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 30,
          },
        }}
      />
    </RootStack.Navigator>
    </NavigationContainer>
  );
}
