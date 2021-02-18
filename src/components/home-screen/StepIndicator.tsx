import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../colors';

const StepIndicator = (props: {currentStep: number; totalSteps: number}) => {
  let pips = [];

  for (let i = 1; i <= props.totalSteps; i++) {
    pips.push(<Pip currentStep={i === props.currentStep} key={i} />);
  }

  return <View style={styles.pipView}>{pips}</View>;
};

const Pip = (props: {currentStep: boolean}) => {
  let style = [
    styles.pip,
    props.currentStep ? styles.activePip : styles.inactivePip,
  ];

  return <View style={style} />;
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
