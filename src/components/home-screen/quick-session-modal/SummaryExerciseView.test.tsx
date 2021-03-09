import React from 'react';
import {render} from '@testing-library/react-native';
import {Exercise} from '../../../types';
import {
  quickSessionSummaryExerciseA11yLabel,
  summaryExerciseDurationTestId,
} from './GeneratedSessionSummaryView';
import {SummaryExerciseView} from './SummaryExerciseView';

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

    const durationComponent = getByTestId(summaryExerciseDurationTestId);
    expect(durationComponent).toBeTruthy();
    expect(durationComponent).toHaveTextContent(numberOfMinutes.toString());
  });

  test.todo(
    'there is an information button, that when pressed brings up an Exercise Descripion Modal',
  );
});
