import 'react-native-gesture-handler';
import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import {StyleSheet, Text} from 'react-native';
import colors from '../colors';
import appStyles from '../app-styles';

const QuickSessionButton = (props: PressableProps) => {
  return (
    <Pressable
      style={appStyles.button}
      accessibilityLabel="Begin a Quick Session"
      {...props}>
      <Text style={styles.text}>Quick Session</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuickSessionButton;
