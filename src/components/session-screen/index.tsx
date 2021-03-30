import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import ExerciseClock from './ExerciseClock';
import Metronome from './Metronome';
import {RootStackParamList} from '../../../App';
import {RouteProp} from '@react-navigation/native';

const Header = ({
  name,
  parentGroupName,
}: {
  name: string;
  parentGroupName?: string;
}) => (
  <View style={styles.header}>
    <TouchableOpacity accessibilityLabel={exerciseInfoButtonA11yLabel}>
      <Text>Info</Text>
    </TouchableOpacity>
    <View style={styles.headerNamesContainer}>
      <Text accessibilityLabel={exerciseNameA11yLabel}>{name}</Text>
      <Text accessibilityLabel={exerciseGroupA11yLabel}>{parentGroupName}</Text>
    </View>
  </View>
);

const SessionScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Session'>;
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const {name, parentGroupName} = route.params.session.exercises[
    currentExerciseIndex
  ];

  return (
    <View style={styles.mainContainer}>
      <Header name={name} parentGroupName={parentGroupName} />
      <ExerciseClock />
      <Metronome />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginVertical: 6,
    width: '100%',
    justifyContent: 'space-between',
  },
  headerNamesContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default SessionScreen;

export const exerciseNameA11yLabel = 'Current exercise';
export const exerciseGroupA11yLabel = 'Exercise focus group';
export const exerciseInfoButtonA11yLabel =
  'Press to show more info on exercise';
export const addNoteButtonA11yLabel = 'Press to add note for exercise';
export const nextButtonA11yLabel = 'Press to go to next exercise';
