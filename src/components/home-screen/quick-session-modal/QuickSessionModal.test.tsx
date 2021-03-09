import React from 'react';
import {fireEvent, render, within} from '@testing-library/react-native';
import QuickSessionModal, {
  hourInputA11yLabel,
  minuteInputA11yLabel,
  nextButtonA11yLabel,
  SessionSetupStep,
  startButtonA11yLabel,
} from '.';
import {generateFocusAreas} from '../../../util/generate-data';
import colors from '../../colors';
import {ExerciseGroup, FocusArea} from '../../../types';
import {areaButtonA11yLabel} from './AreaButton';
import {exerciseGroupA11yLabel} from './ExerciseGroupButton';
import {stepIndicatorA11yLabel, stepIndicatorPipTestId} from './StepIndicator';
import {summaryExerciseTestId} from './labels';
import {generatedQuickSessionSummaryA11yLabel} from './GeneratedSessionSummaryView';
import {randomIntFromInterval} from '../../../util/random-int-from-interval';

interface RenderAndCompleteUntilStepReturnObject
  extends ReturnType<typeof render> {
  selectedFocusArea?: FocusArea;
  selectedExerciseGroup?: ExerciseGroup;
  selectedMinuteValue?: number;
  selectedHourValue?: number;
}

function renderAndCompleteUntilStep(
  stopStep: SessionSetupStep,
): RenderAndCompleteUntilStepReturnObject {
  const areas = generateFocusAreas(randomIntFromInterval(3, 6));
  const helpers = render(<QuickSessionModal areas={areas} />);
  let returnObject: RenderAndCompleteUntilStepReturnObject = {...helpers};
  const {getByA11yLabel} = helpers;

  if (stopStep > SessionSetupStep.Area) {
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );
    fireEvent.press(selectedFocusAreaButton);
    returnObject = {...returnObject, selectedFocusArea};

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    if (stopStep > SessionSetupStep.Group) {
      const selectedExerciseGroup =
        selectedFocusArea.exerciseGroups[
          randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
        ];
      const selectedExerciseGroupButton = getByA11yLabel(
        exerciseGroupA11yLabel(selectedExerciseGroup.name),
      );
      fireEvent.press(selectedExerciseGroupButton);
      returnObject = {...returnObject, selectedExerciseGroup};

      nextButton = getByA11yLabel(nextButtonA11yLabel);
      fireEvent.press(nextButton);

      if (stopStep > SessionSetupStep.Time) {
        const minuteInput = getByA11yLabel(minuteInputA11yLabel);
        const numOfMinutes = randomIntFromInterval(5, 30);
        fireEvent.changeText(minuteInput, numOfMinutes.toString());

        const hourInput = getByA11yLabel(hourInputA11yLabel);
        const numOfHours = randomIntFromInterval(1, 3);
        fireEvent.changeText(hourInput, numOfHours.toString());

        returnObject = {
          ...returnObject,
          selectedMinuteValue: numOfMinutes,
          selectedHourValue: numOfHours,
        };

        nextButton = getByA11yLabel(nextButtonA11yLabel);
        fireEvent.press(nextButton);
      }
    }
  }

  return returnObject;
}

describe('Quick Session Modal', () => {
  test('at first shows buttons to select a focus area for each area', () => {
    const areas = generateFocusAreas(randomIntFromInterval(3, 6));
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);

    const focusAreaButtons = areas.map((area) =>
      getByA11yLabel(areaButtonA11yLabel(area.name)),
    );

    expect(focusAreaButtons).toHaveLength(areas.length);
  });

  test('after selecting one, a "Next" button is revealed', () => {
    const areas = generateFocusAreas(randomIntFromInterval(3, 6));
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);

    const focusAreaButtons = areas.map((area) =>
      getByA11yLabel(areaButtonA11yLabel(area.name)),
    );

    fireEvent.press(
      focusAreaButtons[randomIntFromInterval(0, focusAreaButtons.length - 1)],
    );

    const nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('the "Next" is not shown when an area isn\'t selected', () => {
    const areas = generateFocusAreas(randomIntFromInterval(3, 6));
    const {queryByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    expect(queryByA11yLabel(nextButtonA11yLabel)).toBeFalsy();
  });

  test('after pressing the next button, the focus are buttons go away, and buttons showing exercise groups are presented', () => {
    const {
      queryByA11yLabel,
      getByA11yLabel,
      selectedFocusArea,
    } = renderAndCompleteUntilStep(SessionSetupStep.Group);
    const areas = generateFocusAreas(randomIntFromInterval(3, 6));
    const focusAreaButtons = areas.map((area) =>
      queryByA11yLabel(areaButtonA11yLabel(area.name)),
    );

    focusAreaButtons.forEach((button) => expect(button).toBeFalsy());

    const exerciseGroupButtons = selectedFocusArea!.exerciseGroups.map(
      (exerciseGroup) =>
        getByA11yLabel(exerciseGroupA11yLabel(exerciseGroup.name)),
    );

    expect(exerciseGroupButtons).toHaveLength(
      selectedFocusArea!.exerciseGroups.length,
    );
  });

  test('the "Next" button is displayed after choosing an exercise group', () => {
    const {getByA11yLabel, selectedFocusArea} = renderAndCompleteUntilStep(
      SessionSetupStep.Group,
    );

    const selectedExerciseGroup = selectedFocusArea!.exerciseGroups[
      randomIntFromInterval(0, selectedFocusArea!.exerciseGroups.length - 1)
    ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);
    const nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('after pressing the "Next" button, text inputs for hours and minutes are presented', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(SessionSetupStep.Time);

    const minuteInput = getByA11yLabel(minuteInputA11yLabel);
    const hourInput = getByA11yLabel(hourInputA11yLabel);

    expect(minuteInput).toBeTruthy();
    expect(hourInput).toBeTruthy();
  });

  test('after inputing ONLY a number of minutes, the "Next" button is displayed', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(SessionSetupStep.Time);

    const minuteInput = getByA11yLabel(minuteInputA11yLabel);
    const inputString = randomIntFromInterval(5, 30).toString();
    fireEvent.changeText(minuteInput, inputString);

    const nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('after inputing ONLY a number of hours, the "Next" button is displayed', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(SessionSetupStep.Time);

    const hourInput = getByA11yLabel(hourInputA11yLabel);
    const inputString = randomIntFromInterval(1, 3).toString();
    fireEvent.changeText(hourInput, inputString);

    const nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('a summary of the generated session is presented after the "Next" button is pressed', async () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(
      SessionSetupStep.Summary,
    );

    const generatedSessionSummary = getByA11yLabel(
      generatedQuickSessionSummaryA11yLabel,
    );
    expect(generatedSessionSummary).toBeTruthy();
  });

  test('a number of exercises are presented after the time is set in the summary', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(
      SessionSetupStep.Summary,
    );

    const exercises = within(
      getByA11yLabel(generatedQuickSessionSummaryA11yLabel),
    ).getAllByTestId(summaryExerciseTestId);
    expect(exercises.length).toBeGreaterThanOrEqual(1);
  });

  test('on the final presentation, there is a "Start" button', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(
      SessionSetupStep.Summary,
    );

    expect(getByA11yLabel(startButtonA11yLabel)).toBeTruthy();
  });

  test('there are "progress pips" for each step, with a highlighted one representing the current step', () => {
    let {getByA11yLabel, getByTestId} = renderAndCompleteUntilStep(
      SessionSetupStep.Area,
    );

    let stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(1, 4));
    expect(stepIndicator).toBeTruthy();
    let firstStepPip = getByTestId(stepIndicatorPipTestId(1));
    expect(firstStepPip).toHaveStyle({backgroundColor: colors.primary});

    ({getByA11yLabel, getByTestId} = renderAndCompleteUntilStep(
      SessionSetupStep.Group,
    ));

    stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(2, 4));
    expect(stepIndicator).toBeTruthy();
    let secondStepPip = getByTestId(stepIndicatorPipTestId(2));
    expect(secondStepPip).toHaveStyle({backgroundColor: colors.primary});

    ({getByA11yLabel, getByTestId} = renderAndCompleteUntilStep(
      SessionSetupStep.Time,
    ));

    stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(3, 4));
    expect(stepIndicator).toBeTruthy();
    let thirdStepPip = getByTestId(stepIndicatorPipTestId(3));
    expect(thirdStepPip).toHaveStyle({backgroundColor: colors.primary});

    ({getByA11yLabel, getByTestId} = renderAndCompleteUntilStep(
      SessionSetupStep.Summary,
    ));

    stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(4, 4));
    expect(stepIndicator).toBeTruthy();
    let fourthStepPip = getByTestId(stepIndicatorPipTestId(4));
    expect(fourthStepPip).toHaveStyle({backgroundColor: colors.primary});
  });
});
