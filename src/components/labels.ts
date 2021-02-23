export const areaButtonA11yLabel = (areaName: string) =>
  `Select ${areaName} focus area`;
export const nextButtonA11yLabel = 'Proceed to next choice';
export const exerciseGroupA11yLabel = (groupName: string) =>
  `Select ${groupName} exercise group`;
export const minuteInputA11yLabel = 'Enter number of minutes for session';
export const hourInputA11yLabel = 'Enter number of hours for session';
export const generatedQuickSessionSummaryA11yLabel = 'Generated quick session';
export const stepIndicatorA11yLabel = (
  currentStep: number,
  totalSteps: number,
) => `Currently on step ${currentStep} our of ${totalSteps}`;
export const stepIndicatorPipTestId = (step: number) => `indicator-pip-${step}`;
