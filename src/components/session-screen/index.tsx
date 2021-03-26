import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ExerciseClock from './ExerciseClock';
import Metronome from './Metronome';
import {RootStackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/native';

const SessionScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Session'>;
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  return (
    <View>
      <TouchableOpacity accessibilityLabel={exerciseInfoButtonA11yLabel}>
        <Text>Info</Text>
      </TouchableOpacity>
      <Text accessibilityLabel={exerciseNameA11yLabel}>
        {route.params.session.exercises[currentExerciseIndex].name}
      </Text>
      <Text accessibilityLabel={exerciseGroupA11yLabel}>
        {route.params.session.exercises[currentExerciseIndex].parentGroupName}
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
