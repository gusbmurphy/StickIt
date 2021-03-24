import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Exercise, ExerciseGroup} from '../../../types';
import {
  exerciseRerollButtonA11yLabel,
  GeneratedSessionSummaryView,
  quickSessionSummaryExerciseA11yLabel,
  summaryExerciseTestId,
  summaryTotalTimeA11yLabel,
} from './GeneratedSessionSummaryView';
import {ExerciseSession} from '../../../types/exercise-session';

const testExercises = [
  new Exercise('exercise1'),
  new Exercise('exercise2'),
  new Exercise('exercise3'),
];

const testExerciseGroup = new ExerciseGroup('group');
testExercises.forEach((exercise) => {
  testExerciseGroup.addExercise(exercise);
});

const quickSession: ExerciseSession = {
  exercises: testExercises,
  exerciseDurations: [
    {exerciseId: testExercises[0].id, duration: 5},
    {exerciseId: testExercises[1].id, duration: 5},
    {exerciseId: testExercises[2].id, duration: 5},
  ],
};

describe('Generated Quick Session Summary View', () => {
  test('given a session summary, creates an exercise view for each exercise', () => {
    const {getAllByTestId} = render(
      <GeneratedSessionSummaryView
        session={quickSession}
        exerciseGroups={[testExerciseGroup]}
      />,
    );

    expect(getAllByTestId(summaryExerciseTestId)).toHaveLength(
      testExercises.length,
    );
  });

  test('the quick session summary displays the total amount of time for the session', () => {
    const {getByA11yLabel} = render(
      <GeneratedSessionSummaryView
        session={quickSession}
        exerciseGroups={[testExerciseGroup]}
      />,
    );

    const totalDuration = quickSession.exerciseDurations
      .map((e) => e.duration)
      .reduce((pre, cur) => {
        return pre + cur;
      }, 0);

    expect(
      getByA11yLabel(summaryTotalTimeA11yLabel(totalDuration)),
    ).toBeTruthy();
  });

  test('each exercise in the summary has a "reroll" button next to it, when pressed it replaces the exercise', () => {
    const {getByA11yLabel, queryByA11yLabel} = render(
      <GeneratedSessionSummaryView
        session={quickSession}
        exerciseGroups={[testExerciseGroup]}
      />,
    );

    testExercises.forEach((exercise) => {
      const rerollButton = getByA11yLabel(
        exerciseRerollButtonA11yLabel(exercise.name),
      );

      fireEvent.press(rerollButton);

      expect(
        queryByA11yLabel(
          quickSessionSummaryExerciseA11yLabel(
            testExerciseGroup.name,
            exercise.name,
            quickSession.exerciseDurations.find(
              (e) => e.exerciseId === exercise.id,
            )!.duration,
          ),
        ),
      ).toBeFalsy();
    });
  });

  test.todo(
    'when an exercise is rerolled, all requirements previously set are still met',
  );
});
