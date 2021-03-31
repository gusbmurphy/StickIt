import 'react-native-gesture-handler';
import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import {Text} from 'react-native';
import {buttonStyles} from '../../styles';

const QuickSessionButton = (props: PressableProps) => {
  return (
    <Pressable
      style={buttonStyles.default}
      accessibilityLabel="Begin a Quick Session"
      {...props}>
      <Text style={buttonStyles.text}>Quick Session</Text>
    </Pressable>
  );
};

export default QuickSessionButton;
