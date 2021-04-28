import React from 'react';
import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
import {PickerIOS} from '@react-native-picker/picker';

export const hourPickerValues = [...Array(5).keys()];
export const hourItemTestId = (value: number) => `${value}-value-hour`;
const hourPickerItems = hourPickerValues.map((value) => (
  <PickerIOS.Item
    label={value.toString()}
    value={value}
    key={value}
    testID={hourItemTestId(value)}
  />
));

export const minutePickerValues = [...Array(61).keys()];
export const minuteItemTestId = (value: number) => `${value}-value-minute`;
const minutePickerItems = minutePickerValues
  .filter((value) => value % 5 === 0)
  .map((value) => (
    <PickerIOS.Item
      label={value.toString()}
      value={value}
      key={value}
      testID={minuteItemTestId(value)}
    />
  ));

const TimePicker = ({
  minutes,
  setMinutes,
  hours,
  setHours,
  style,
}: {
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  hours: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  style: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[style, styles.mainContainer]} testID={timePickerTestId}>
      <PickerIOS
        accessibilityLabel={hourPickerA11yLabel}
        testID={hourPickerTestId}
        style={styles.picker}
        selectedValue={hours}
        onValueChange={(value) => setHours(parseInt(value.toString(), 10))}>
        {hourPickerItems}
      </PickerIOS>
      <Text>hours</Text>
      <PickerIOS
        accessibilityLabel={minutePickerA11yLabel}
        testID={minutePickerTestId}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
  },
});

export const minutePickerA11yLabel = 'select a number of minutes';
export const minutePickerTestId = 'minute-picker';
export const hourPickerA11yLabel = 'select a number of hours';
export const hourPickerTestId = 'hour-picker';
export const timePickerTestId = 'time-picker';

export default TimePicker;
