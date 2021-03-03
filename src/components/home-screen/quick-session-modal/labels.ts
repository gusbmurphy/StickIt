export const summaryExerciseTestId = 'exercise';

export const startButtonA11yLabel = 'Begin quick session';

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

export const exerciseRerollButtonA11yLabel = (exerciseName: string) =>
  `Replace ${exerciseName}`;

export const exerciseRerollButtonTestId = 'reroll-button';
