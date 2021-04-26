import {fireEvent, within} from '@testing-library/react-native';
import {
  nextButtonA11yLabel,
  SessionSetupStep,
  startButtonA11yLabel,
  StepPrompts,
  stepPromptTestId,
  exerciseGroupSkipA11yLabel,
} from '.';
import colors from '../../../styles/colors';
import {areaButtonA11yLabel} from './AreaButton';
import {exerciseGroupA11yLabel} from './ExerciseGroupButton';
import {
  stepIndicatorA11yLabel,
  stepIndicatorPipTestId,
} from '../../util/StepIndicator';
import {summaryExerciseTestId} from './labels';
import {generatedQuickSessionSummaryA11yLabel} from './GeneratedSessionSummaryView';
import {randomIntFromInterval} from '../../../util/random-int-from-interval';
import {act} from 'react-test-renderer';
import {
  timePickerTestId,
  minutePickerA11yLabel,
  hourPickerA11yLabel,
} from '../../util/TimePicker';
import {renderAndCompleteUntilStep} from './QuickSessionModal.test.util';

describe('Quick Session Modal', () => {
  test('at first shows buttons to select a focus area for each area', () => {
    const {getByA11yLabel, areas} = renderAndCompleteUntilStep(
      SessionSetupStep.Area,
    );

    const focusAreaButtons = areas.map((area) =>
      getByA11yLabel(areaButtonA11yLabel(area.name)),
    );

    expect(focusAreaButtons).toHaveLength(areas.length);
  });

  test('after selecting one, a "Next" button is revealed', () => {
    const {getByA11yLabel, areas} = renderAndCompleteUntilStep(
      SessionSetupStep.Area,
    );

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
    const {queryByA11yLabel} = renderAndCompleteUntilStep(
      SessionSetupStep.Area,
    );
    expect(queryByA11yLabel(nextButtonA11yLabel)).toBeFalsy();
  });

  test('after pressing the next button, the focus are buttons go away, and buttons showing exercise groups are presented', () => {
    const {
      areas,
      queryByA11yLabel,
      getByA11yLabel,
      selectedFocusArea,
    } = renderAndCompleteUntilStep(SessionSetupStep.Group);
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

  test('there is a button to "skip" selecting a preffered exercise group', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(SessionSetupStep.Group);
    expect(getByA11yLabel(exerciseGroupSkipA11yLabel)).toBeTruthy();
  });

  test('skipping the exercise group selection will proceed to the time input', () => {
    const {getByA11yLabel} = renderAndCompleteUntilStep(SessionSetupStep.Group);
    const skipButton = getByA11yLabel(exerciseGroupSkipA11yLabel);

    act(() => {
      fireEvent.press(skipButton);
    });

    const minuteInput = getByA11yLabel(minutePickerA11yLabel);
    const hourInput = getByA11yLabel(hourPickerA11yLabel);

    expect(minuteInput).toBeTruthy();
    expect(hourInput).toBeTruthy();
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

  test('after pressing the "Next" button, a TimePicker is presented', () => {
    const {getByTestId} = renderAndCompleteUntilStep(SessionSetupStep.Time);
    expect(getByTestId(timePickerTestId)).toBeTruthy();
  });

// TODO: All of the tests having to do with selecting times are broken because of the new TimePicker,
  // I believe the solution involves mocking that component, but I'm having trouble at the moment
  test.todo(
    'when ONLY a number of minutes are selected, the "Next" button is displayed',
  );
  test.todo(
    'after inputing ONLY a number of hours, the "Next" button is displayed',
  );
  test.todo(
    'an input that would result in exercise durations of 0 is not accepted',
  );

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

  test('there is a prompt on each screen describing the choice being made (except for the summary step)', () => {
    expect(
      renderAndCompleteUntilStep(SessionSetupStep.Area).queryByTestId(
        stepPromptTestId,
      ),
    ).toBeTruthy();

    expect(
      renderAndCompleteUntilStep(SessionSetupStep.Group).queryByTestId(
        stepPromptTestId,
      ),
    ).toBeTruthy();

    expect(
      renderAndCompleteUntilStep(SessionSetupStep.Time).queryByTestId(
        stepPromptTestId,
      ),
    ).toBeTruthy();

    expect(
      renderAndCompleteUntilStep(SessionSetupStep.Summary).queryByTestId(
        stepPromptTestId,
      ),
    ).toBeFalsy();
  });

  test('the prompt correctly describes each step (except for the summary step)', () => {
    expect(
      renderAndCompleteUntilStep(SessionSetupStep.Area).queryByText(
        StepPrompts[SessionSetupStep.Area],
      ),
    ).toBeTruthy();

    const {queryByText, selectedFocusArea} = renderAndCompleteUntilStep(
      SessionSetupStep.Group,
    );

    expect(
      queryByText(StepPrompts[SessionSetupStep.Group](selectedFocusArea!.name)),
    ).toBeTruthy();

    expect(
      renderAndCompleteUntilStep(SessionSetupStep.Time).queryByText(
        StepPrompts[SessionSetupStep.Time],
      ),
    ).toBeTruthy();
  });
});
