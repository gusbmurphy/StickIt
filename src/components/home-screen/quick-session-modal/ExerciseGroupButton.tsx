import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import {buttonStyles, fontSizes} from '../../../styles';

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
          styles.button,
          props.selected ? styles.buttonSelected : styles.buttonUnselected,
        ]}>
        <Text
          style={[
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
    ...buttonStyles.default,
    margin: 10,
    padding: 12,
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
    ...buttonStyles.text,
    color: colors.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontSizes.large,
  },
  buttonTextSelected: {
    color: 'white',
  },
});

export const exerciseGroupA11yLabel = (groupName: string) =>
  `Select ${groupName} exercise group`;
