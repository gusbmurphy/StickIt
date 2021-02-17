import 'react-native-gesture-handler';
import React from 'react';
import {Pressable} from 'react-native';
import {StyleSheet, Text} from 'react-native';

const QuickSessionButton = () => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#327495',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <Pressable style={styles.button} accessibilityLabel="Begin a Quick Session">
      <Text style={styles.text}>Quick Session</Text>
    </Pressable>
  );
};

export default QuickSessionButton;
