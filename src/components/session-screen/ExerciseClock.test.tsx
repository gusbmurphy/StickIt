import React from 'react';
import {render} from '@testing-library/react-native';
import ExerciseClock, {
  timeTextTestId,
  startButtonA11yLabel,
  currentTimeA11yLabel,
} from './ExerciseClock';
import {randomIntFromInterval} from '../../util/random-int-from-interval';

describe('Exercise Clock', () => {
  test('it has a text display of the given time', () => {
    const {getByTestId} = render(<ExerciseClock />);
    expect(getByTestId(timeTextTestId)).toBeTruthy();
  });

  test('it has a "Start" button', () => {
    const {getByA11yLabel} = render(<ExerciseClock />);
    expect(getByA11yLabel(startButtonA11yLabel)).toBeTruthy();
  });

  test('the text display begins at the correct amount of time given an amount of minutes and amount of seconds between 0 and 60', () => {
    const seconds = randomIntFromInterval(1, 59);
    const minutes = randomIntFromInterval(1, 10);
    const {getByA11yLabel} = render(
      <ExerciseClock minutes={minutes} seconds={seconds} />,
    );
    expect(getByA11yLabel(currentTimeA11yLabel(minutes, seconds))).toBeTruthy();
  });

  test('the text display begins at the correct amount of time even if passed a strange amount (more seconds than 60)', () => {
    const seconds = randomIntFromInterval(60, 300);
    const minutesInSeconds = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const minutes = randomIntFromInterval(1, 10);

    const {getByA11yLabel} = render(
      <ExerciseClock minutes={minutes} seconds={seconds} />,
    );
    expect(
      getByA11yLabel(
        currentTimeA11yLabel(minutes + minutesInSeconds, secondsRemaining),
      ),
    ).toBeTruthy();
  });

  test('the text display begins at the correct amount of time if passed only minutes', () => {
    const minutes = randomIntFromInterval(1, 10);

    let {getByA11yLabel} = render(<ExerciseClock minutes={minutes} />);
    expect(getByA11yLabel(currentTimeA11yLabel(minutes, 0))).toBeTruthy();
  });

  test('the text display begins at the correct amount of time if passed only seconds', () => {
    const seconds = randomIntFromInterval(60, 300);
    const minutesInSeconds = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    const {getByA11yLabel} = render(<ExerciseClock seconds={seconds} />);
    expect(
      getByA11yLabel(currentTimeA11yLabel(minutesInSeconds, secondsRemaining)),
    ).toBeTruthy();
  });

  test('if no seconds or minutes are passed, an error is thrown', () => {
    expect(render(<ExerciseClock />)).toThrowError();
  });

  test.todo(
    'after pressing the start button, the time display decrements in seconds',
  );
  test.todo('upon pressing the start button, the "onStart" function is called');
  test.todo('when the timer reaches "0:00", the "onFinish" function is called');
});
