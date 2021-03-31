import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import {buttonStyles} from '../../../styles';

export const AreaButton = (props: {
  name: string;
  selected: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => props.handlePress()}
      accessibilityLabel={areaButtonA11yLabel(props.name)}>
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
    padding: 5,
    height: 130,
    width: 130,
    borderRadius: 10,
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
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonTextSelected: {
    color: 'white',
  },
});

export const areaButtonA11yLabel = (areaName: string) =>
  `Select ${areaName} focus area`;
