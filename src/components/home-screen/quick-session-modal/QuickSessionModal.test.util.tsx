import React from 'react';
import {render, fireEvent, within, act} from '@testing-library/react-native';
import {FocusArea, ExerciseGroup} from '../../../types';
import QuickSessionModal, {SessionSetupStep, nextButtonA11yLabel} from '.';
import {generateFocusAreas} from '../../../util/generate-data';
import {randomIntFromInterval} from '../../../util/random-int-from-interval';
import {areaButtonA11yLabel} from './AreaButton';
import {exerciseGroupA11yLabel} from './ExerciseGroupButton';
import {
  minutePickerValues,
  hourPickerValues,
  timePickerTestId,
  minutePickerTestId,
  hourPickerTestId,
  minuteItemTestId,
  hourItemTestId,
} from '../../util/TimePicker';

interface RenderAndCompleteUntilStepReturnObject
  extends ReturnType<typeof render> {
  areas: FocusArea[];
  selectedFocusArea?: FocusArea;
  selectedExerciseGroup?: ExerciseGroup;
  selectedMinuteValue?: number;
  selectedHourValue?: number;
  onRequestNavigateToSession?: ReturnType<typeof jest.fn>;
  onRequestCloseSelfNoPlatform?: ReturnType<typeof jest.fn>;
}

export function renderAndCompleteUntilStep(
  stopStep: SessionSetupStep,
): RenderAndCompleteUntilStepReturnObject {
  const areas = generateFocusAreas(randomIntFromInterval(3, 6));
  const onRequestNavigateToSession = jest.fn();
  const onRequestCloseSelfNoPlatform = jest.fn();
  const helpers = render(
    <QuickSessionModal
      areas={areas}
      onRequestNavigateToSession={onRequestNavigateToSession}
      onRequestCloseSelfNoPlatform={onRequestCloseSelfNoPlatform}
    />,
  );
  let returnObject: RenderAndCompleteUntilStepReturnObject = {
    ...helpers,
    areas,
    onRequestNavigateToSession,
    onRequestCloseSelfNoPlatform,
  };
  const {getByA11yLabel, getByTestId} = helpers;

  if (stopStep > SessionSetupStep.Area) {
    const selectedFocusArea = areas[randomIntFromInterval(0, areas.length - 1)];
    const selectedFocusAreaButton = getByA11yLabel(
      areaButtonA11yLabel(selectedFocusArea.name),
    );
    fireEvent.press(selectedFocusAreaButton);
    returnObject = {...returnObject, selectedFocusArea};

    let nextButton = getByA11yLabel(nextButtonA11yLabel);
    act(() => fireEvent.press(nextButton));

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
      act(() => fireEvent.press(nextButton));

      if (stopStep > SessionSetupStep.Time) {
        const timePicker = getByTestId(timePickerTestId);

        const minuteInput = within(timePicker).getByTestId(minutePickerTestId);

        const numOfMinutes =
          minutePickerValues[
            randomIntFromInterval(0, minutePickerValues.length)
          ];
        const selectedMinuteInput = within(minuteInput).getByTestId(
          minuteItemTestId(numOfMinutes),
        );
        act(() => fireEvent.press(selectedMinuteInput));

        const hourInput = within(timePicker).getByTestId(hourPickerTestId);

        const numOfHours =
          hourPickerValues[randomIntFromInterval(0, hourPickerValues.length)];
        const selectedHourInput = within(hourInput).getByTestId(
          hourItemTestId(numOfHours),
        );
        act(() => fireEvent.press(selectedHourInput));

        returnObject = {
          ...returnObject,
          selectedMinuteValue: numOfMinutes,
          selectedHourValue: numOfHours,
        };

        nextButton = getByA11yLabel(nextButtonA11yLabel);
        act(() => fireEvent.press(nextButton));
      }
    }
  }

  return returnObject;
}
