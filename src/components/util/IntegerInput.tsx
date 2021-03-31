import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../../styles/colors';

const IntegerInput = (
  props: Omit<
    React.ComponentProps<typeof TextInput>,
    'onChange' | 'onChangeText' | 'value'
  > & {
    onChange: (value: number) => void;
    value: number;
  },
) => {
  const {value, onChange, style: propsStyle, ...otherProps} = props;
  return (
    <TextInput
      value={value.toString()}
      autoCorrect={false}
      keyboardType={'numeric'}
      onChangeText={(text) => {
        text = text.replace(/[^0-9]/g, '');
        if (text) {
          onChange(parseInt(text, 10));
        } else {
          onChange(0);
        }
      }}
      style={[styles.input, propsStyle]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default IntegerInput;
