export const areaButtonA11yLabel = (areaName: string) =>
  `Select ${areaName} focus area`;
export const nextButtonA11yLabel = 'Proceed to next choice';
export const exerciseGroupA11yLabel = (groupName: string) =>
  `Select ${groupName} exercise group`;
export const minuteInputA11yLabel = 'Enter number of minutes for session';
export const hourInputA11yLabel = 'Enter number of hours for session';
export const generatedQuickSessionSummaryA11yLabel =
  'Summary of generated quick session';
export const stepIndicatorA11yLabel = (
  currentStep: number,
  totalSteps: number,
) => `Currently on step ${currentStep} out of ${totalSteps}`;
export const stepIndicatorPipTestId = (step: number) => `indicator-pip-${step}`;
export const quickSessionSummaryExerciseA11yLabel = (
  groupName: string,
  exerciseName: string,
  duration: number,
) => `${exerciseName} from ${groupName} for ${duration} minutes`;
export const quickSessionSummaryExerciseTestId = 'exercise';
export const quickSessionStartButtonA11yLabel = 'Begin quick session';
export const quickSessionSummaryTotalTimeA11yLabel = (
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
export const quickSessionSummaryRerollButtonA11yLabel = (
  exerciseName: string,
) => `Replace ${exerciseName}`;
export const quickSessionSummaryRerollButtonTestId = 'reroll-button';
