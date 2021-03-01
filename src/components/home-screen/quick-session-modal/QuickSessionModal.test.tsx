import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import QuickSessionModal from './QuickSessionModal';
import areas from '../../../util/default-areas';
import {
  exerciseGroupA11yLabel,
  hourInputA11yLabel,
  minuteInputA11yLabel,
  generatedQuickSessionSummaryA11yLabel,
  stepIndicatorA11yLabel,
  stepIndicatorPipTestId,
  areaButtonA11yLabel,
  nextButtonA11yLabel,
} from '../../labels';
import colors from '../../colors';

/* Thanks to StackOverflow user jonschlinkert: https://stackoverflow.com/a/7228322/6741328, no way I could've come up with this. */
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe('Quick Session Modal', () => {
  test('at first shows buttons to select a focus area for each area', () => {
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);

    const focusAreaButtons = areas.map((area) =>
      getByA11yLabel(areaButtonA11yLabel(area.name)),
    );

    expect(focusAreaButtons).toHaveLength(areas.length);
  });

  test('after selecting one, a "Next" button is revealed', () => {
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
    const {queryByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    expect(queryByA11yLabel(nextButtonA11yLabel)).toBeFalsy();
  });

  test('after pressing the next button, the focus are buttons go away, and buttons showing exercise groups are presented', () => {
    const {getByA11yLabel, queryByA11yLabel} = render(
      <QuickSessionModal areas={areas} />,
    );
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    fireEvent.press(selectedFocusAreaButton);

    const nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const focusAreaButtons = areas.map((area) =>
      queryByA11yLabel(areaButtonA11yLabel(area.name)),
    );

    focusAreaButtons.forEach((button) => expect(button).toBeFalsy());

    const exerciseGroupButtons = selectedFocusArea.exerciseGroups.map(
      (exerciseGroup) =>
        getByA11yLabel(exerciseGroupA11yLabel(exerciseGroup.name)),
    );

    expect(exerciseGroupButtons).toHaveLength(
      selectedFocusArea.exerciseGroups.length,
    );
  });

  test('the "Next" button is displayed after choosing an exercise group', () => {
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    fireEvent.press(selectedFocusAreaButton);

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const selectedExerciseGroup =
      selectedFocusArea.exerciseGroups[
        randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
      ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);
    nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('after pressing the "Next" button, text inputs for hours and minutes are presented', () => {
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    fireEvent.press(selectedFocusAreaButton);

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const selectedExerciseGroup =
      selectedFocusArea.exerciseGroups[
        randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
      ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);
    nextButton = getByA11yLabel(nextButtonA11yLabel);

    fireEvent.press(nextButton);

    const minuteInput = getByA11yLabel(minuteInputA11yLabel);
    const hourInput = getByA11yLabel(hourInputA11yLabel);

    expect(minuteInput).toBeTruthy();
    expect(hourInput).toBeTruthy();
  });

  test('after inputing ONLY a number of minutes, the "Next" button is displayed', () => {
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    fireEvent.press(selectedFocusAreaButton);

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const selectedExerciseGroup =
      selectedFocusArea.exerciseGroups[
        randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
      ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);
    nextButton = getByA11yLabel(nextButtonA11yLabel);

    fireEvent.press(nextButton);

    const minuteInput = getByA11yLabel(minuteInputA11yLabel);
    const inputString = randomIntFromInterval(5, 30).toString();
    fireEvent.changeText(minuteInput, inputString);

    nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('after inputing ONLY a number of hours, the "Next" button is displayed', () => {
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    fireEvent.press(selectedFocusAreaButton);

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const selectedExerciseGroup =
      selectedFocusArea.exerciseGroups[
        randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
      ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);
    nextButton = getByA11yLabel(nextButtonA11yLabel);

    fireEvent.press(nextButton);

    const hourInput = getByA11yLabel(hourInputA11yLabel);
    const inputString = randomIntFromInterval(1, 3).toString();
    fireEvent.changeText(hourInput, inputString);

    nextButton = getByA11yLabel(nextButtonA11yLabel);
    expect(nextButton).toBeTruthy();
  });

  test('a summary of the generated session is presented after the "Next" button is pressed', () => {
    const {getByA11yLabel} = render(<QuickSessionModal areas={areas} />);
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    fireEvent.press(selectedFocusAreaButton);

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const selectedExerciseGroup =
      selectedFocusArea.exerciseGroups[
        randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
      ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);

    nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const minuteInput = getByA11yLabel(minuteInputA11yLabel);
    const hourInput = getByA11yLabel(hourInputA11yLabel);
    const numOfMinutes = randomIntFromInterval(5, 30);
    const numOfHours = randomIntFromInterval(1, 3);
    fireEvent.changeText(minuteInput, numOfMinutes.toString());
    fireEvent.changeText(hourInput, numOfHours.toString());

    nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    const generatedSessionSummary = getByA11yLabel(
      generatedQuickSessionSummaryA11yLabel,
    );
    expect(generatedSessionSummary).toBeTruthy();
  });

  test.todo('a number of exercises are presented after the time is set');
  test.todo('on the final presentation, there is a "Start" button');
  test.todo(
    'each exercise has a "reroll" button next to it, when pressed it replaces the exercise',
  );
  test.todo(
    'when an exercise is rerolled, all requirements previously set are still met',
  );

  test('there are "progress pips" for each step, with a highlighted one representing the current step', () => {
    const {getByA11yLabel, getByTestId} = render(
      <QuickSessionModal areas={areas} />,
    );
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );

    let stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(1, 4));
    expect(stepIndicator).toBeTruthy();
    let firstStepPip = getByTestId(stepIndicatorPipTestId(1));
    expect(firstStepPip).toHaveStyle({backgroundColor: colors.primary});

    fireEvent.press(selectedFocusAreaButton);

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(2, 4));
    expect(stepIndicator).toBeTruthy();
    let secondStepPip = getByTestId(stepIndicatorPipTestId(2));
    expect(secondStepPip).toHaveStyle({backgroundColor: colors.primary});

    const selectedExerciseGroup =
      selectedFocusArea.exerciseGroups[
        randomIntFromInterval(0, selectedFocusArea.exerciseGroups.length - 1)
      ];
    const selectedExerciseGroupButton = getByA11yLabel(
      exerciseGroupA11yLabel(selectedExerciseGroup.name),
    );

    fireEvent.press(selectedExerciseGroupButton);

    nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(3, 4));
    expect(stepIndicator).toBeTruthy();
    let thirdStepPip = getByTestId(stepIndicatorPipTestId(3));
    expect(thirdStepPip).toHaveStyle({backgroundColor: colors.primary});

    const minuteInput = getByA11yLabel(minuteInputA11yLabel);
    const hourInput = getByA11yLabel(hourInputA11yLabel);
    const numOfMinutes = randomIntFromInterval(5, 30);
    const numOfHours = randomIntFromInterval(1, 3);
    fireEvent.changeText(minuteInput, numOfMinutes.toString());
    fireEvent.changeText(hourInput, numOfHours.toString());

    nextButton = getByA11yLabel(nextButtonA11yLabel);
    fireEvent.press(nextButton);

    stepIndicator = getByA11yLabel(stepIndicatorA11yLabel(4, 4));
    expect(stepIndicator).toBeTruthy();
    let fourthStepPip = getByTestId(stepIndicatorPipTestId(4));
    expect(fourthStepPip).toHaveStyle({backgroundColor: colors.primary});
  });
});
