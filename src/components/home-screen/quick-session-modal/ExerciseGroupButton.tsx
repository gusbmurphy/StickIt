import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../colors';
import appStyles from '../../app-styles';

export const ExerciseGroupButton = (props: {
  name: string;
  selected: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => props.handlePress()}
      accessibilityLabel={exerciseGroupA11yLabel(props.name)}>
      <View
        style={[
          appStyles.button,
          styles.button,
          props.selected ? styles.buttonSelected : styles.buttonUnselected,
        ]}>
        <Text
          style={[
            appStyles.buttonText,
            styles.buttonText,
            props.selected ? styles.buttonTextSelected : null,
          ]}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUnselected: {
    backgroundColor: colors.secondary,
  },
  buttonSelected: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonTextSelected: {
    color: 'white',
  },
});

export const exerciseGroupA11yLabel = (groupName: string) =>
  `Select ${groupName} exercise group`;
