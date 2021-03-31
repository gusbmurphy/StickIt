import {StyleSheet} from 'react-native';
import colors from './colors';

export const buttonStyles = StyleSheet.create({
  default: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
