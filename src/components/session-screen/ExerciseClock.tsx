import React from 'react';
import {Text, View} from 'react-native';

const ExerciseClock = () => {
  return (
    <View testID={clockTestId}>
      <Text>Exercise Clock</Text>
    </View>
  );
};

export default ExerciseClock;

export const clockTestId = 'exercise-clock';
