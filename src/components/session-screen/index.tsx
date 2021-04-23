import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import ExerciseClock from './ExerciseClock';
import Metronome from './Metronome';
import {RootStackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/native';
import StepIndicator from '../util/StepIndicator';
import Text from '../../styles/components/StyledText';
import InfoIcon from '../../assets/info.svg';

const SessionScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Session'>;
}) => {
  const {
    session: {exercises, exerciseDurations},
  } = route.params;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showAddNoteButton, setShowAddNoteButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const {name, parentGroupName, id} = exercises[currentExerciseIndex];
  const {duration} = exerciseDurations.find((d) => d.exerciseId === id)!;

  const onTimerComplete = () => {
    setShowAddNoteButton(true);
    setShowNextButton(true);
  };

  const AddNoteButton = () => (
    <TouchableOpacity accessibilityLabel={addNoteButtonA11yLabel}>
      <Text>{'Add Note'}</Text>
    </TouchableOpacity>
  );

  const NextButton = () => (
    <TouchableOpacity accessibilityLabel={nextButtonA11yLabel}>
      <Text>{'Next'}</Text>
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity accessibilityLabel={exerciseInfoButtonA11yLabel}>
        <InfoIcon />
      </TouchableOpacity>
      <View style={styles.headerNamesContainer}>
        <Text
          accessibilityLabel={exerciseGroupA11yLabel}
          style={styles.parentGroupName}>
          {parentGroupName}
        </Text>
        <Text
          style={styles.exerciseName}
          accessibilityLabel={exerciseNameA11yLabel}>
          {name}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Header />
      <ExerciseClock minutes={duration} onFinish={() => onTimerComplete()} />
      <Metronome />
      <StepIndicator
        currentStep={currentExerciseIndex + 1}
        totalSteps={route.params.session.exercises.length}
      />
      {showAddNoteButton && <AddNoteButton />}
      {showNextButton && <NextButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginVertical: 6,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerNamesContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  parentGroupName: {
    fontSize: 14,
    textTransform: 'lowercase',
  },
  exerciseName: {
    fontSize: 20,
  },
});

export default SessionScreen;

export const exerciseNameA11yLabel = 'Current exercise';
export const exerciseGroupA11yLabel = 'Exercise focus group';
export const exerciseInfoButtonA11yLabel =
  'Press to show more info on exercise';
export const addNoteButtonA11yLabel = 'Press to add note for exercise';
export const nextButtonA11yLabel = 'Press to go to next exercise';
