import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/components/home-screen';
import SessionScreen from './src/components/session-screen';
import {ExerciseSession} from './src/types';

export type RootStackParamList = {
  Home: undefined;
  Session: {session: ExerciseSession};
  QuickSessionModal: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Session" component={SessionScreen} />
        </RootStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
