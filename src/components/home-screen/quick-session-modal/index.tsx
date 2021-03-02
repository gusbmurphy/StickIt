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
import {
  hourInputA11yLabel,
  minuteInputA11yLabel,
  nextButtonA11yLabel,
} from '../../labels';
import appStyles from '../../app-styles';
import StepIndicator from './StepIndicator';
import {AreaButton} from './AreaButton';
import {ExerciseGroupButton} from './ExerciseGroupButton';
import {ExerciseGroup} from '../../../types';
import IntegerInput from '../../util/IntegerInput';

enum SessionSetupStep {
  Area = 1,
  Group = 2,
  Time = 3,
  Summary = 4,
}

const QuickSessionModal = (props: ModalProps & {areas: FocusArea[]}) => {
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
    <View style={styles.timeInputsView}>
      <View style={styles.individualTimeInputView}>
        <IntegerInput
          onChange={(v) => setMinutes(v)}
          value={minutes}
          accessibilityLabel={minuteInputA11yLabel}
          style={styles.timeInput}
        />
        <Text style={styles.timeInputText}>min</Text>
      </View>
      <View style={styles.individualTimeInputView}>
        <IntegerInput
          onChange={(v) => setHours(v)}
          value={hours}
          accessibilityLabel={hourInputA11yLabel}
          style={styles.timeInput}
        />
        <Text style={styles.timeInputText}>hr</Text>
      </View>
    </View>
  );

  const CurrentStepView = () => {
    switch (currentStep) {
      case SessionSetupStep.Area:
        return <View style={styles.areasView}>{areaButtons}</View>;
      case SessionSetupStep.Group:
        return (
          <View style={styles.exerciseGroupsView}>{exerciseGroupButtons}</View>
        );
      case SessionSetupStep.Time:
        return <TimeInputView />;
      default:
        return <Text>Something else!</Text>;
    }
  };

  const NextButton = () => {
    return (
      <TouchableOpacity
        accessibilityLabel={nextButtonA11yLabel}
        onPress={() => handleNextButtonPress()}>
        <View style={appStyles.button}>
          <Text style={[appStyles.buttonText, styles.nextButtonText]}>
            Next
          </Text>
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
      case SessionSetupStep.Summary:
        console.log("Let's go!");
        break;
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <Text style={styles.headerText}>Quick Session</Text>
            <Text>What would you like to work on today?</Text>
          </View>
          <CurrentStepView />
          <View>
            {selectionIsMade && <NextButton />}
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
  textView: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
  },
  areasView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseGroupsView: {},
  nextButtonText: {
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
  stepIndicator: {
    alignSelf: 'center',
  },
});

export default QuickSessionModal;
