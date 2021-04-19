import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import ExerciseClock, {
  timeTextTestId,
  startButtonA11yLabel,
  currentTimeA11yLabel,
} from './ExerciseClock';
import {randomIntFromInterval} from '../../util/random-int-from-interval';

describe('Exercise Clock', () => {
  test('it has a text display of the given time', () => {
    const seconds = randomIntFromInterval(1, 59);
    const minutes = randomIntFromInterval(1, 10);
    const {getByTestId} = render(
      <ExerciseClock seconds={seconds} minutes={minutes} />,
    );
    expect(getByTestId(timeTextTestId)).toBeTruthy();
  });

  test('it has a "Start" button', () => {
    const {getByA11yLabel} = render(<ExerciseClock seconds={1} />);
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

    const {getByTestId} = render(
      <ExerciseClock minutes={minutes} seconds={seconds} />,
    );
    const timeText = getByTestId(timeTextTestId);

    expect(timeText.props.accessibilityLabel).toBe(
      currentTimeA11yLabel(minutesInSeconds + minutes, secondsRemaining),
    );
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
    expect(() => render(<ExerciseClock />)).toThrowError();
  });

  describe('Time-sensitive Tests', () => {
    beforeEach(() => jest.useFakeTimers());

    test('after pressing the start button, the time display decrements with every second, until it reaches the end', () => {
      const seconds = randomIntFromInterval(1, 59);
      const minutes = randomIntFromInterval(1, 10);
      const totalSeconds = seconds + minutes * 60;

      const {getByA11yLabel, getByTestId} = render(
        <ExerciseClock seconds={seconds} minutes={minutes} />,
      );

      const startButton = getByA11yLabel(startButtonA11yLabel);
      const timeText = getByTestId(timeTextTestId);

      act(() => {
        fireEvent.press(startButton);

        let msRemaining = totalSeconds * 1000;
        while (msRemaining > 0) {
          jest.advanceTimersByTime(1000);
          msRemaining -= 1000;
          expect(timeText.props.accessibilityLabel).toBe(
            currentTimeA11yLabel(0, msRemaining / 1000),
          );
        }

        // Ensure that the timer is not advanced after it should be stopped
        jest.advanceTimersByTime(1000);
        expect(timeText.props.accessibilityLabel).toBe(
          currentTimeA11yLabel(0, 0),
        );
      });
    });

    test('when the timer reaches "0:00", the "onFinish" function is called', () => {
      const seconds = randomIntFromInterval(1, 59);
      const minutes = randomIntFromInterval(1, 10);
      const totalSeconds = seconds + minutes * 60;

      const onFinish = jest.fn();

      const {getByA11yLabel} = render(
        <ExerciseClock
          onFinish={onFinish}
          seconds={seconds}
          minutes={minutes}
        />,
      );

      const startButton = getByA11yLabel(startButtonA11yLabel);

      act(() => {
        fireEvent.press(startButton);

        let msRemaining = totalSeconds * 1000;
        while (msRemaining > 0) {
          jest.advanceTimersByTime(1000);
          msRemaining -= 1000;
        }
      });

      expect(onFinish).toHaveBeenCalledTimes(1);
    });
  });

  test('upon pressing the start button, the "onStart" function is called', () => {
    const seconds = randomIntFromInterval(1, 59);
    const minutes = randomIntFromInterval(1, 10);

    const onStart = jest.fn();

    const {getByA11yLabel} = render(
      <ExerciseClock onStart={onStart} seconds={seconds} minutes={minutes} />,
    );

    const startButton = getByA11yLabel(startButtonA11yLabel);
    act(() => fireEvent.press(startButton));

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
