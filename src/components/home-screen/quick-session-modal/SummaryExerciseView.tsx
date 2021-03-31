import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Exercise} from '../../../types';
import colors from '../../../styles/colors';
import {
  summaryExerciseTestId,
  quickSessionSummaryExerciseA11yLabel,
  summaryExerciseDurationTestId,
} from './GeneratedSessionSummaryView';

export const SummaryExerciseView = (props: {
  exercise: Exercise;
  groupName: string;
  numberOfMinutes: number;
}) => (
  <View
    testID={summaryExerciseTestId}
    accessibilityLabel={quickSessionSummaryExerciseA11yLabel(
      props.groupName,
      props.exercise.name,
      props.numberOfMinutes,
    )}
    style={styles.mainContainer}>
    <InfoButton />
    <View style={styles.nameDurationContainer}>
      <View>
        <Text style={styles.groupText}>{props.groupName}</Text>
        <Text style={styles.largeText}>{props.exercise.name}</Text>
      </View>
      <Text style={styles.largeText} testID={summaryExerciseDurationTestId}>
        {props.numberOfMinutes}
      </Text>
    </View>
  </View>
);

const InfoButton = () => <Text style={styles.infoButton}>I</Text>;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
  },
  nameDurationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },
  largeText: {
    fontSize: 18,
  },
  groupText: {
    fontSize: 12,
  },
  infoButton: {
    marginHorizontal: 8,
  },
});
