import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ModalProps,
  TouchableOpacity,
} from 'react-native';
import {FocusArea} from '../../../types/focus-area';
import StepIndicator from '../../util/StepIndicator';
import {AreaButton} from './AreaButton';
import {ExerciseGroupButton} from './ExerciseGroupButton';
import {ExerciseGroup} from '../../../types';
import {GeneratedSessionSummaryView} from './GeneratedSessionSummaryView';
import {ExerciseSession} from '../../../types/exercise-session';
import {createSession} from './create-session';
import TimePicker from '../../util/TimePicker';
import {buttonStyles} from '../../../styles';

export enum SessionSetupStep {
  Area = 1,
  Group = 2,
  Time = 3,
  Summary = 4,
}

export const StepPrompts = {
  [SessionSetupStep.Area]: 'What would you like to work on today?',
  [SessionSetupStep.Group]: (areaName: string) =>
    `"${areaName}" it is. Any exercise groups in particular?`,
  [SessionSetupStep.Time]: 'How much time do you have?',
};

const QuickSessionModal = (
  props: ModalProps & {
    areas: FocusArea[];
    onRequestNavigateToSession: (session: ExerciseSession) => void;
    onRequestCloseSelfNoPlatform: () => void;
  },
) => {
  const [currentStep, setCurrentStep] = useState(SessionSetupStep.Area);
  const [selectedArea, setSelectedArea] = useState<FocusArea | null>(null);
  const exerciseGroups = useFocusAreaExerciseGroups(selectedArea);
  const [
    selectedExerciseGroup,
    setSelectedExerciesGroup,
  ] = useState<ExerciseGroup | null>(null);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [selectionIsMade, setSelectionIsMade] = useState(false);
  const [session, setSession] = useState<ExerciseSession | null>(null);

  useEffect(() => {
    switch (currentStep) {
      case SessionSetupStep.Area:
        setSelectionIsMade(selectedArea !== null);
        break;
      case SessionSetupStep.Group:
        setSelectionIsMade(selectedExerciseGroup !== null);
        break;
      case SessionSetupStep.Time:
        setSelectionIsMade(totalMinutes > 0);
        break;
    }
  }, [selectedArea, selectedExerciseGroup, totalMinutes, currentStep]);

  useEffect(() => {
    setTotalMinutes(minutes + hours);
  }, [minutes, hours]);

  useEffect(() => {
    if (totalMinutes > 0 && exerciseGroups && selectedExerciseGroup) {
      setSession(createSession(totalMinutes, selectedExerciseGroup));
    }
  }, [totalMinutes, exerciseGroups, selectedExerciseGroup]);

  const areaButtons = props.areas.map((area, i) => (
    <AreaButton
      name={area.name}
      key={i}
      selected={selectedArea?.id === area.id}
      handlePress={() =>
        selectedArea?.id !== area.id
          ? setSelectedArea(area)
          : setSelectedArea(null)
      }
    />
  ));

  const exerciseGroupButtons = exerciseGroups
    ? exerciseGroups.map((group, i) => (
        <ExerciseGroupButton
          name={group.name}
          key={i}
          selected={selectedExerciseGroup?.id === group.id}
          handlePress={() =>
            selectedExerciseGroup?.id !== group.id
              ? setSelectedExerciesGroup(group)
              : setSelectedExerciesGroup(null)
          }
        />
      ))
    : null;

  const TimeInputView = () => (
    <TimePicker
      minutes={minutes}
      setMinutes={setMinutes}
      hours={hours}
      setHours={setHours}
    />
  );

  const CurrentStepView = () => {
    let content;
    switch (currentStep) {
      case SessionSetupStep.Area:
        content = <View style={styles.areasView}>{areaButtons}</View>;
        break;
      case SessionSetupStep.Group:
        content = (
          <View style={styles.exerciseGroupsView}>{exerciseGroupButtons}</View>
        );
        break;
      case SessionSetupStep.Time:
        content = <TimeInputView />;
        break;
      case SessionSetupStep.Summary:
        content = (
          <GeneratedSessionSummaryView
            session={session!}
            exerciseGroups={exerciseGroups!}
          />
        );
    }

    return <View style={styles.currentStepView}>{content}</View>;
  };

  const NextButton = () => {
    return (
      <TouchableOpacity
        accessibilityLabel={nextButtonA11yLabel}
        onPress={() => handleNextButtonPress()}>
        <View style={buttonStyles.default}>
          <Text style={[styles.nextButtonText]}>Next</Text>
        </View>
      </TouchableOpacity>
    );
  };

  function handleNextButtonPress() {
    switch (currentStep) {
      case SessionSetupStep.Area:
        setCurrentStep(SessionSetupStep.Group);
        break;
      case SessionSetupStep.Group:
        setCurrentStep(SessionSetupStep.Time);
        break;
      case SessionSetupStep.Time:
        setCurrentStep(SessionSetupStep.Summary);
        break;
    }
  }

  const StartButton = () => {
    return (
      <TouchableOpacity
        accessibilityLabel={startButtonA11yLabel}
        onPress={() => handleStartButtonPress()}>
        <View style={buttonStyles.default}>
          <Text style={buttonStyles.text}>Start</Text>
        </View>
      </TouchableOpacity>
    );
  };

  function handleStartButtonPress() {
    props.onRequestNavigateToSession(session!);
    props.onRequestCloseSelfNoPlatform();
  }

  const CurrentPrompt = () => {
    if (currentStep === SessionSetupStep.Summary) {
      return null;
    }

    let text: string;
    if (currentStep === SessionSetupStep.Group) {
      text = StepPrompts[SessionSetupStep.Group](selectedArea!.name);
    } else {
      text = StepPrompts[currentStep];
    }

    return (
      <Text style={styles.promptText} testID={stepPromptTestId}>
        {text}
      </Text>
    );
  };

  const NextOrStartButton = () => {
    switch (currentStep) {
      case SessionSetupStep.Area:
      case SessionSetupStep.Group:
      case SessionSetupStep.Time:
        if (selectionIsMade) {
          return <NextButton />;
        } else {
          return null;
        }
      case SessionSetupStep.Summary:
        return <StartButton />;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Quick Session</Text>
            <CurrentPrompt />
          </View>
          <CurrentStepView />
          <View style={styles.footer}>
            <NextOrStartButton />
            <StepIndicator
              currentStep={currentStep}
              totalSteps={4}
              style={styles.stepIndicator}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

function useFocusAreaExerciseGroups(area: FocusArea | null) {
  const [groups, setGroups] = useState<ExerciseGroup[] | null>();

  useEffect(() => {
    if (area) {
      setGroups(area.exerciseGroups);
    } else {
      setGroups(null);
    }
  }, [area]);

  return groups;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-around',
  },
  headerView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
  },
  promptText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  currentStepView: {
    flex: 1,
  },
  areasView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseGroupsView: {},
  nextButtonText: {
    ...buttonStyles.text,
    fontWeight: 'bold',
  },
  timeInput: {
    fontSize: 18,
  },
  timeInputsView: {
    flex: 1,
    justifyContent: 'center',
  },
  individualTimeInputView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInputText: {
    marginLeft: 10,
    fontSize: 18,
  },
  footer: {
    justifyContent: 'flex-end',
  },
  stepIndicator: {
    alignSelf: 'center',
  },
});

export const startButtonA11yLabel = 'Begin quick session';
export const stepPromptTestId = 'step-prompt';
export const exerciseRerollButtonTestId = 'reroll-button';
export const nextButtonA11yLabel = 'Proceed to next choice';
export const minuteInputA11yLabel = 'Enter number of minutes for session';
export const hourInputA11yLabel = 'Enter number of hours for session';
export const exerciseGroupSkipA11yLabel = 'Skip selecting a preferred exercise';

export default QuickSessionModal;
