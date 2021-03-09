import React from 'react';
import {View, Text} from 'react-native';
import {Exercise} from '../../../types';
import {
  summaryExerciseTestId,
  quickSessionSummaryExerciseA11yLabel,
  summaryExerciseDurationTestId,
} from './GeneratedSessionSummaryView';

export const SummaryExerciseView = (props: {
  exercise: Exercise;
  groupName: string;
  numberOfMinutes: number;
}) => (
  <View
    testID={summaryExerciseTestId}
    accessibilityLabel={quickSessionSummaryExerciseA11yLabel(
      props.groupName,
      props.exercise.name,
      props.numberOfMinutes,
    )}>
    <Text>{props.exercise.name}</Text>
    <Text>{props.groupName}</Text>
    <Text testID={summaryExerciseDurationTestId}>{props.numberOfMinutes}</Text>
  </View>
);
