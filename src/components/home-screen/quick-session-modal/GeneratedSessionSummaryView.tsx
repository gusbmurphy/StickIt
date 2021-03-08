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
export const summaryTotalTimeA11yLabel = (
  minutes?: number,
  hours?: number,
): string => {
  if ((!minutes && !hours) || (minutes === 0 && hours === 0)) {
    throw new Error('0 minutes and 0 hours passed to label');
  }
  if (!hours || hours === 0) {
    return `Total quick session time is ${minutes} minute${
      minutes! > 1 ? 's' : ''
    }`;
  } else if (!minutes || minutes === 0) {
    return `Total quick session time is ${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `Total quick session time is ${hours} hour${
    hours > 1 ? 's' : ''
  } and ${minutes} minute${minutes > 1 ? 's' : ''}`;
};

export const summaryExerciseTestId = 'exercise';
export const summaryExerciseDurationTestId = 'exercise-duration';
export const summaryExerciseGroupIdTestId = 'exercise-group';
export const summaryExerciseNameTestId = 'exercise-name';
export const quickSessionSummaryExerciseA11yLabel = (
  groupName: string,
  exerciseName: string,
  duration: number,
) => `${exerciseName} from ${groupName} for ${duration} minutes`;
