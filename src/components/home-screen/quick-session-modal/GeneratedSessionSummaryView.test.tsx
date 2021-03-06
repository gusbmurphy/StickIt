import {render, within} from '@testing-library/react-native';
import React from 'react';
import {Exercise} from '../../../types';
import {
  quickSessionSummaryExerciseA11yLabel,
  summaryExerciseDurationTestId,
  SummaryExerciseView,
} from './GeneratedSessionSummaryView';

describe('Generated Quick Session Summary View', () => {
  test.todo('given a session summary, an exercise view for each exercise');
  test.todo(
    'the quick session summary displays the total amount of time for the session',
  );
  test.todo(
    'each exercise in the summary has a "reroll" button next to it, when pressed it replaces the exercise',
  );
  test.todo(
    'when an exercise is rerolled, all requirements previously set are still met',
  );
});

describe('Quick Session Summary Exercise View', () => {
  test('the view has the correct accessibility label applied', () => {
    const exerciseName = 'Exercise';
    const exercise = new Exercise(exerciseName);
    const groupName = 'Exercise Group';
    const numberOfMinutes = 5;

    const {queryByA11yLabel} = render(
      <SummaryExerciseView
        exercise={exercise}
        groupName={groupName}
        numberOfMinutes={numberOfMinutes}
      />,
    );

    expect(
      queryByA11yLabel(
        quickSessionSummaryExerciseA11yLabel(
          groupName,
          exerciseName,
          numberOfMinutes,
        ),
      ),
    ).toBeTruthy();
  });

  test('given an exercise, its group name, and a duration, displays the exercise name, its group, and its duration', () => {
    const exerciseName = 'Exercise';
    const exercise = new Exercise(exerciseName);
    const groupName = 'Exercise Group';
    const numberOfMinutes = 5;

    const {queryByText, getByTestId} = render(
      <SummaryExerciseView
        exercise={exercise}
        groupName={groupName}
        numberOfMinutes={numberOfMinutes}
      />,
    );

    expect(queryByText(exerciseName)).toBeTruthy();
    expect(queryByText(groupName)).toBeTruthy();
    expect(
      within(getByTestId(summaryExerciseDurationTestId)).findByText(
        numberOfMinutes.toString(),
      ),
    ).toBeTruthy();
  });
  test.todo(
    'there is an information button, that when pressed brings up an Exercise Descripion Modal',
  );
});
