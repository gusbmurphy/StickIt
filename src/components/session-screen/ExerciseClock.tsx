import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button} from 'react-native';
import {getReducedTimeFromTotalSeconds} from '../../util/time-formatting';

const ExerciseClock = ({
  minutes = 0,
  seconds = 0,
  onStart,
  onFinish,
}: {
  minutes?: number;
  seconds?: number;
  onStart?: () => void;
  onFinish?: () => void;
}) => {
  if (minutes < 1 && seconds < 1) {
    throw new Error('Invalid time passed to ExerciseClock');
  }

  const totalSeconds = minutes * 60 + seconds;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [timerActive, setTimerActive] = useState(false);
  const timerInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerActive) {
      timerInterval.current = setInterval(() => {
        decrementSecondsRemaining(secondsRemaining);
      }, 1000);
      return () => {
        if (timerInterval.current) {
          clearInterval(timerInterval.current!);
        }
      };
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current!);
        timerInterval.current = undefined;
      }
    }

    function decrementSecondsRemaining(prev: typeof secondsRemaining) {
      setSecondsRemaining(prev - 1);
    }
  }, [onFinish, secondsRemaining, timerActive, timerInterval]);

  useEffect(() => {
    if (secondsRemaining < 1) {
      setTimerActive(false);

      if (onFinish) {
        onFinish();
      }
    }
  }, [onFinish, secondsRemaining]);

  const {
    minutes: reducedMinutes,
    seconds: reducedSeconds,
  } = getReducedTimeFromTotalSeconds(secondsRemaining);

  const timeString = `${
    reducedMinutes > 9 ? reducedMinutes : `0${reducedMinutes}`
  }:${reducedSeconds > 9 ? reducedSeconds : `0${reducedSeconds}`}`;

  const onStartPress = () => {
    if (onStart) {
      onStart();
    }
    setTimerActive(true);
  };

  return (
    <View testID={clockTestId}>
      <Text
        testID={timeTextTestId}
        accessibilityLabel={currentTimeA11yLabel(
          reducedMinutes,
          reducedSeconds,
        )}>
        {timeString}
      </Text>
      <Button
        title="Start"
        onPress={onStartPress}
        accessibilityLabel={startButtonA11yLabel}
      />
    </View>
  );
};

export default ExerciseClock;

export const clockTestId = 'exercise-clock';
export const timeTextTestId = 'time-text';
export const currentTimeA11yLabel = (minutes = 0, seconds: number) => {
  let totalSeconds = minutes * 60 + seconds;

  const {
    minutes: reducedMinutes,
    seconds: reducedSeconds,
  } = getReducedTimeFromTotalSeconds(totalSeconds);

  let returnString = '';
  if (reducedMinutes > 0) {
    returnString += `${reducedMinutes} minutes and `;
  }
  returnString += `${reducedSeconds} seconds remaining`;

  return returnString;
};
export const startButtonA11yLabel = 'Begin exercise clock';
