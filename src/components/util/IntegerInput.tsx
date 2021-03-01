import React from 'react';
import {TextInput} from 'react-native';

const IntegerInput = (
  props: Omit<
    React.ComponentProps<typeof TextInput>,
    'onChange' | 'onChangeText' | 'value'
  > & {
    onChange: (value: number) => void;
    value: number;
  },
) => {
  const {value, onChange, ...otherProps} = props;
  return (
    <TextInput
      {...otherProps}
      value={value.toString()}
      autoCorrect={false}
      keyboardType={'numeric'}
      onChangeText={(text) => {
        text.replace(/[^0-9]/g, '');
        onChange(parseInt(text, 10));
      }}
    />
  );
};

export default IntegerInput;
