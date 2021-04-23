import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../colors';

const StyledText = (
  props: React.ComponentProps<typeof Text> & {children: React.ReactNode},
) => {
  const {style: propsStyle, ...otherProps} = props;
  return <Text style={[styles.text, propsStyle]} {...otherProps} />;
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
});

export default StyledText;
