import React from 'react';
import {render} from '@testing-library/react-native';
import SessionScreen, {
  exerciseNameA11yLabel,
  exerciseGroupA11yLabel,
  exerciseInfoButtonA11yLabel,
  nextButtonA11yLabel,
  addNoteButtonA11yLabel,
} from '.';
import {generateSession} from '../../util/generate-data';
import {clockTestId} from './ExerciseClock';
import {metronomeTestId} from './Metronome';
import {ExerciseSession} from '../../types';

function createSessionScreenProps(
  session: ExerciseSession,
): React.ComponentProps<typeof SessionScreen> {
  return {
    route: {
      key: 'test',
      name: 'Session',
      params: {
        session,
      },
    },
  };
}

// TODO: This mocking works well enough for a single test, but we need to be able
// to change the funcitonality between tests. I think that the 'ts-jest' library's
// helper funcitons could be useful here!

// jest.mock('./ExerciseClock.tsx', () => {
//   // eslint-disable-next-line no-shadow
// //  const React = require('react');
//   const {Text} = require('react-native');
//   const {useEffect} = require('react');
//   const RealClock = jest.requireActual('./ExerciseClock.tsx');
//   return ({onFinish}: React.ComponentProps<typeof RealClock>) => {
//     useEffect(() => {
//       console.log('Hello!');
//       onFinish!();
//     });
//     return <Text>Clock Mock</Text>;
//   };
// });

describe('Session Screen', () => {
  test("the current exercise's name and focus group is displayed", () => {
    const session = generateSession();
    const {queryByA11yLabel} = render(
      <SessionScreen {...createSessionScreenProps(session)} />,
    );

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
    const {queryByA11yLabel} = render(
      <SessionScreen {...createSessionScreenProps(session)} />,
    );
    expect(queryByA11yLabel(exerciseInfoButtonA11yLabel)).toBeTruthy();
  });

  test.todo(
    'pressing the info button brings up a modal with more info on the current exercise',
  );

  test('there is an ExerciseClock component', () => {
    const session = generateSession();
    const {queryByTestId} = render(
      <SessionScreen {...createSessionScreenProps(session)} />,
    );
    expect(queryByTestId(clockTestId)).toBeTruthy();
  });

  test('there is a Metronome component', () => {
    const session = generateSession();
    const {queryByTestId} = render(
      <SessionScreen {...createSessionScreenProps(session)} />,
    );
    expect(queryByTestId(metronomeTestId)).toBeTruthy();
  });

  //  TODO: These tests need the ExerciseClock to be mocked so that it just calls it's
  //  "onFinish" function without the need to mess with any time-related functionality.
  describe('Tests With Completed Clock', () => {
    test.todo(
      'when the exercise has finished, an "Add Note" button is displayed',
      () => {
        // const ClockMock = ({
        //   onFinish,
        // }: React.ComponentProps<typeof ExerciseClock>) => {
        //   useEffect(() => onFinish!());
        //   return <Text>Clock Mock</Text>;
        // };
        // jest.doMock('./ExerciseClock', () => ClockMock);
        // const session = generateSession();
        // const {getByA11yLabel} = render(
        //   <SessionScreen {...createSessionScreenProps(session)} />,
        // );
        // expect(getByA11yLabel(addNoteButtonA11yLabel)).toBeTruthy();
      },
    );

    test.todo(
      'when the exercise is finished, a "Next" button is displayed',
      () => {
        // const session = generateSession();
        // const {getByA11yLabel} = render(
        //   <SessionScreen {...createSessionScreenProps(session)} />,
        // );
        // expect(getByA11yLabel(nextButtonA11yLabel)).toBeTruthy();
      },
    );
  });

  test('the "Add Note" button is not displayed before the exercise has finished', () => {
    const session = generateSession();
    const {queryByA11yLabel} = render(
      <SessionScreen {...createSessionScreenProps(session)} />,
    );

    expect(queryByA11yLabel(addNoteButtonA11yLabel)).toBeFalsy();
  });

  test.todo('pressing the "Add Note" button brings up a modal to add a note');

  test('the "Next" button is not displayed before the exercise is finished', () => {
    const session = generateSession();
    const {queryByA11yLabel} = render(
      <SessionScreen {...createSessionScreenProps(session)} />,
    );
    expect(queryByA11yLabel(nextButtonA11yLabel)).toBeFalsy();
  });

  test.todo('pressing the "Next" button navigates to the next exercise');
  test.todo(
    'there are progress pips showing the correct number of exercises in the session, and the correct current exercise',
  );
});
