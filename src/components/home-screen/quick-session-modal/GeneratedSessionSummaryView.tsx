import React from 'react';
import {View, Text} from 'react-native';
import {Exercise} from '../../../types';

export const GeneratedSessionSummaryView = () => {
  const ExerciseView = (exercise: Exercise) => (
    <View
      testID={summaryExerciseTestId}
      accessibilityLabel={quickSessionSummaryExerciseA11yLabel(
        exerciseGroups?.find((group) => group.id === exercise.parentGroupId!),
        exercise.name,
      )}></View>
  );

  return (
    <View accessibilityLabel={generatedQuickSessionSummaryA11yLabel}>
      <Text>Hello!</Text>
    </View>
  );
};

export const generatedQuickSessionSummaryA11yLabel =
  'Summary of generated quick session';

export const summaryExerciseTestId = 'exercise';
export const quickSessionSummaryExerciseA11yLabel = (
  groupName: string,
  exerciseName: string,
  duration: number,
) => `${exerciseName} from ${groupName} for ${duration} minutes`;
