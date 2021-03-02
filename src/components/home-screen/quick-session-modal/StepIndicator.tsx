import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../colors';
import {stepIndicatorA11yLabel, stepIndicatorPipTestId} from '../../labels';

const StepIndicator = (props: {currentStep: number; totalSteps: number}) => {
  let pips = [];

  for (let i = 1; i <= props.totalSteps; i++) {
    pips.push(
      <Pip currentStep={i === props.currentStep} key={i} stepNumber={i} />,
    );
  }

  return (
    <View
      style={styles.pipView}
      accessibilityLabel={stepIndicatorA11yLabel(
        props.currentStep,
        props.totalSteps,
      )}>
      {pips}
    </View>
  );
};

const Pip = (props: {currentStep: boolean; stepNumber: number}) => {
  let pipStyles = [
    styles.pip,
    props.currentStep ? styles.activePip : styles.inactivePip,
  ];

  return (
    <View style={pipStyles} testID={stepIndicatorPipTestId(props.stepNumber)} />
  );
};

const styles = StyleSheet.create({
  pip: {
    margin: 7,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activePip: {
    backgroundColor: colors.primary,
  },
  inactivePip: {
    backgroundColor: colors.secondary,
  },
  pipView: {
    flexDirection: 'row',
  },
});

export default StepIndicator;
