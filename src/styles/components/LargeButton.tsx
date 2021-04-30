import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Text from './StyledText';
import {buttonStyles} from '../buttons';
import fontSizes from '../font-sizes';

type AdditionalProps = {
  label: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const LargeButton = (
  props: Omit<React.ComponentProps<typeof TouchableOpacity>, 'style'> &
    AdditionalProps,
) => {
  return (
    <TouchableOpacity
      accessibilityLabel={props.accessibilityLabel}
      onPress={(event) => {
        if (props.onPress) {
          props.onPress(event);
        }
      }}
      style={[styles.button, props.buttonStyle]}>
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...buttonStyles.default,
    paddingVertical: 18,
  },
  label: {
    ...buttonStyles.text,
    fontSize: fontSizes.xLarge,
  },
});
