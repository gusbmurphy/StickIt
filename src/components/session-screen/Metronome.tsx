import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../styles';
import Text from '../../styles/components/StyledText';

const OptionButton = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  return (
    <View style={styles.optionButton}>
      <Text>{name.toUpperCase()} </Text>
      <Text>{placeholder}</Text>
    </View>
  );
};

const MainPart = () => {
  return (
    <View style={styles.mainPartContainer}>
      <Text>Metronome</Text>
    </View>
  );
};

const Metronome = () => {
  return (
    <View style={styles.mainContainer} testID={metronomeTestId}>
      <View style={styles.optionColumn}>
        <OptionButton name="meter" placeholder="3/4" />
        <OptionButton name="muting" placeholder="off" />
      </View>
      <MainPart />
      <View style={styles.optionColumn}>
        <OptionButton name="sounds" placeholder="Woodblock" />
        <View style={styles.optionButton}>
          <Text>Tap</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  mainPartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
  },
  optionColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionButton: {
    height: 40,
    width: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 4,
  },
});

export default Metronome;

export const metronomeTestId = 'metronome';
