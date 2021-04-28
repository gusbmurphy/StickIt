import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../../styles/components/StyledText';
import {Exercise} from '../../../types';
import colors from '../../../styles/colors';
import InfoIcon from '../../../assets/info.svg';
import RedoIcon from '../../../assets/redo-alt.svg';
import {
  summaryExerciseTestId,
  quickSessionSummaryExerciseA11yLabel,
  summaryExerciseDurationTestId,
} from './GeneratedSessionSummaryView';
import {fontSizes} from '../../../styles';

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
    style={styles.infoContainer}>
    <InfoButton />
    <View style={styles.nameDurationContainer}>
      <View>
        <Text style={styles.groupText}>{props.groupName}</Text>
        <Text style={styles.exerciseName}>{props.exercise.name}</Text>
      </View>
      <Text style={styles.durationText} testID={summaryExerciseDurationTestId}>
        {props.numberOfMinutes}
      </Text>
    </View>
  </View>
);

const InfoButton = () => <InfoIcon style={styles.infoButton} width={25} />;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 8,
  },
  nameDurationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },
  exerciseName: {
    fontSize: fontSizes.medium,
  },
  groupText: {
    fontSize: fontSizes.small,
  },
  durationText: {
    fontSize: fontSizes.medium,
    marginRight: 10,
  },
  infoButton: {
    marginHorizontal: 8,
  },
});
