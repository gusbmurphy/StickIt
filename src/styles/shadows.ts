import {StyleSheet} from 'react-native';
import colors from './colors';

const base = {
  shadowColor: colors.text,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
};

const shadows = StyleSheet.create({
  medium: {
    ...base,
  },
  light: {
    ...base,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default shadows;
