import React from 'react';
import {render, within} from '@testing-library/react-native';
import SessionScreen, {exerciseNameA11yLabel, exerciseGroupA11yLabel} from '.';
import {generateSession} from '../../util/generate-data';

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
    expect(within(name?.instance).getByText(firstName)).toBeTruthy();
    expect(within(group?.instance).getByText(firstGroupName)).toBeTruthy();
  });

  test.todo('there is an "Info" button');
  test.todo(
    'pressing the info button brings up a modal with more info on the current exercise',
  );
  test.todo('there is an ExerciseClock component');
  test.todo('there is a Metronome component');
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
