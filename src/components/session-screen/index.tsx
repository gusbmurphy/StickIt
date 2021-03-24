import React, {useState} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {ExerciseSession} from '../../types/exercise-session';
import ExerciseClock from './ExerciseClock';
import Metronome from './Metronome';

const SessionScreen = ({session}: {session: ExerciseSession}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  return (
    <View>
      <TouchableOpacity accessibilityLabel={exerciseInfoButtonA11yLabel}>
        Info
      </TouchableOpacity>
      <Text accessibilityLabel={exerciseNameA11yLabel}>
        {session.exercises[currentExerciseIndex].name}
      </Text>
      <Text accessibilityLabel={exerciseGroupA11yLabel}>
        {session.exercises[currentExerciseIndex].parentGroupName}
      </Text>
      <ExerciseClock />
      <Metronome />
    </View>
  );
};

export default SessionScreen;

export const exerciseNameA11yLabel = 'Current exercise';
export const exerciseGroupA11yLabel = 'Exercise focus group';
export const exerciseInfoButtonA11yLabel =
  'Press to show more info on exercise';
export const addNoteButtonA11yLabel = 'Press to add note for exercise';
export const nextButtonA11yLabel = 'Press to go to next exercise';
