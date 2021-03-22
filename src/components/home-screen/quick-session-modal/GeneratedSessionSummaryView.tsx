import React from 'react';
import {View, Text} from 'react-native';
import {ExerciseGroup} from '../../../types';
import {ExerciseSession} from '../../../types/quick-session';
import {SummaryExerciseView} from './SummaryExerciseView';

export const GeneratedSessionSummaryView = (props: {
  session: ExerciseSession;
  exerciseGroups: ExerciseGroup[];
}) => {
  if (props.session.exercises.length < 1) {
    throw new Error(
      'Session with no exercises passed to GeneratedSessionsSummaryView',
    );
  }

  let totalDuration = 0;

  const exercises = props.session.exercises.map((exercise, i) => {
    const duration = props.session.exerciseDurations.find(
      (d) => d.exerciseId === exercise.id,
    )!.duration;

    totalDuration += duration;

    return (
      <SummaryExerciseView
        exercise={exercise}
        groupName={
          props.exerciseGroups.find(
            (group) => group.id === exercise.parentGroupId,
          )!.name
        }
        numberOfMinutes={duration}
        key={i}
      />
    );
  });

  return (
    <View accessibilityLabel={generatedQuickSessionSummaryA11yLabel}>
      {exercises}
      <Text accessibilityLabel={summaryTotalTimeA11yLabel(totalDuration)}>
        {totalDuration}
      </Text>
    </View>
  );
};

export const generatedQuickSessionSummaryA11yLabel =
  'Summary of generated quick session';
export const sessionTotalDurationTestId = 'total-duration';
export const exerciseRerollButtonA11yLabel = (exerciseName: string) =>
  `Replace ${exerciseName}`;

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
