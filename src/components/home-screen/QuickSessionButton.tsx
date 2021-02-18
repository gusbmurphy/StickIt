import 'react-native-gesture-handler';
import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import {Text} from 'react-native';
import appStyles from '../app-styles';

const QuickSessionButton = (props: PressableProps) => {
  return (
    <Pressable
      style={appStyles.button}
      accessibilityLabel="Begin a Quick Session"
      {...props}>
      <Text style={appStyles.buttonText}>Quick Session</Text>
    </Pressable>
  );
};

export default QuickSessionButton;
