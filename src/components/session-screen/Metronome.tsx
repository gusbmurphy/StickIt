import React from 'react';
import {Text, View} from 'react-native';

const Metronome = () => {
  return (
    <View testID={metronomeTestId}>
      <Text>Metronome</Text>
    </View>
  );
};

export default Metronome;

export const metronomeTestId = 'metronome';
