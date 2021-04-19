import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PickerIOS} from '@react-native-picker/picker';

export const hourPickerValues = [...Array(5).keys()];
const hourPickerItems = hourPickerValues.map((value) => (
  <PickerIOS.Item label={value.toString()} value={value} key={value} />
));

export const minutePickerValues = [...Array(61).keys()];
const minutePickerItems = minutePickerValues
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
        accessibilityLabel={hourPickerA11yLabel}
        style={styles.picker}
        selectedValue={hours}
        onValueChange={(value) => setHours(parseInt(value.toString(), 10))}>
        {hourPickerItems}
      </PickerIOS>
      <Text>hours</Text>
      <PickerIOS
        accessibilityLabel={minutePickerA11yLabel}
        style={styles.picker}
        selectedValue={minutes}
        onValueChange={(value) => setMinutes(parseInt(value.toString(), 10))}>
        {minutePickerItems}
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

export const minutePickerA11yLabel = 'select a number of minutes';
export const hourPickerA11yLabel = 'select a number of hours';

export default TimePicker;
