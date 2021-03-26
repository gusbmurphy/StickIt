import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PickerIOS} from '@react-native-picker/picker';

const hourItems = [...Array(5).keys()].map((value) => (
  <PickerIOS.Item label={value.toString()} value={value} key={value} />
));

const minuteItems = [...Array(61).keys()]
  .filter((value) => value % 5 === 0)
  .map((value) => (
    <PickerIOS.Item label={value.toString()} value={value} key={value} />
  ));

const TimePicker = ({
  minutes,
  setMinutes,
  hours,
  setHours,
}: {
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  hours: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View style={styles.mainContainer}>
      <PickerIOS
        style={styles.picker}
        selectedValue={hours}
        onValueChange={(value) => setHours(parseInt(value.toString(), 10))}>
        {hourItems}
      </PickerIOS>
      <Text>hours</Text>
      <PickerIOS
        style={styles.picker}
        selectedValue={minutes}
        onValueChange={(value) => setMinutes(parseInt(value.toString(), 10))}>
        {minuteItems}
      </PickerIOS>
      <Text>minutes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
});

export default TimePicker;