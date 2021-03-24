import React from 'react';
import {render} from '@testing-library/react-native';
import SessionScreen, {
  exerciseNameA11yLabel,
  exerciseGroupA11yLabel,
  exerciseInfoButtonA11yLabel,
} from '.';
import {generateSession} from '../../util/generate-data';
import {clockTestId} from './ExerciseClock';
import {metronomeTestId} from './Metronome';

describe('Session Screen', () => {
  test("the current exercise's name and focus group is displayed", () => {
    const session = generateSession();
    const {queryByA11yLabel} = render(<SessionScreen session={session} />);

    const name = queryByA11yLabel(exerciseNameA11yLabel);
    expect(name).toBeTruthy();

    const group = queryByA11yLabel(exerciseGroupA11yLabel);
    expect(group).toBeTruthy();

    const firstName = session.exercises[0].name;
    const firstGroupName = session.exercises[0].parentGroupName!;
    expect(name).toHaveTextContent(firstName);
    expect(group).toHaveTextContent(firstGroupName);
  });

  test('there is an "Info" button', () => {
    const session = generateSession();
    const {queryByA11yLabel} = render(<SessionScreen session={session} />);
    expect(queryByA11yLabel(exerciseInfoButtonA11yLabel)).toBeTruthy();
  });

  test.todo(
    'pressing the info button brings up a modal with more info on the current exercise',
  );

  test('there is an ExerciseClock component', () => {
    const session = generateSession();
    const {queryByTestId} = render(<SessionScreen session={session} />);
    expect(queryByTestId(clockTestId)).toBeTruthy();
  });

  test('there is a Metronome component', () => {
    const session = generateSession();
    const {queryByTestId} = render(<SessionScreen session={session} />);
    expect(queryByTestId(metronomeTestId)).toBeTruthy();
  });

  test.todo(
    'when the exercise has finished, an "Add Note" button is displayed',
  );
  test.todo(
    'the "Add Note" button is not displayed before the exercise has finished',
  );
  test.todo('pressing the "Add Note" button brings up a modal to add a note');
  test.todo('when the exercise is finished, a "Next" button is displayed');
  test.todo(
    'the "Next" button is not displayed before the exercise is finished',
  );
  test.todo('pressing the "Next" button navigates to the next exercise');
  test.todo(
    'there are progress pips showing the correct number of exercises in the session, and the correct current exercise',
  );
});
