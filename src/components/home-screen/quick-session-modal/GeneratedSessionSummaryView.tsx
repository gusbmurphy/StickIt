import React from 'react';
import {View, Text} from 'react-native';
import {Exercise} from '../../../types';

export const GeneratedSessionSummaryView = () => {
  return (
    <View accessibilityLabel={generatedQuickSessionSummaryA11yLabel}>
      <Text>Hello!</Text>
    </View>
  );
};

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
    <Text>SummaryExerciseView</Text>
  </View>
);

export const generatedQuickSessionSummaryA11yLabel =
  'Summary of generated quick session';

export const summaryExerciseTestId = 'exercise';
export const summaryExerciseDurationTestId = 'exercise-duration';
export const summaryExerciseGroupIdTestId = 'exercise-group';
export const summaryExerciseNameTestId = 'exercise-name';
export const quickSessionSummaryExerciseA11yLabel = (
  groupName: string,
  exerciseName: string,
  duration: number,
) => `${exerciseName} from ${groupName} for ${duration} minutes`;
