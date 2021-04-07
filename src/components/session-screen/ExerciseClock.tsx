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
export const currentTimeA11yLabel = (minutes: Number, seconds: Number) => {
  let string = '';
  if (minutes > 0) {
    string += `${minutes} minutes and `;
  }
  string += `${seconds} seconds remaining`;
  return string;
};
export const startButtonA11yLabel = 'Begin exercise clock';
