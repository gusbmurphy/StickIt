import {StyleSheet} from 'react-native';
import colors from './colors';

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default buttonStyles;
