import {StyleSheet} from 'react-native';
import colors from '../styles/colors';

const appStyles = StyleSheet.create({
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

export default appStyles;
