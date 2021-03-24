import React from 'react';
import {View} from 'react-native';
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
    <View>
      <PickerIOS
        selectedValue={hours}
        onValueChange={(value) => setHours(parseInt(value.toString(), 10))}>
        {hourItems}
      </PickerIOS>
      <PickerIOS
        selectedValue={minutes}
        onValueChange={(value) => setMinutes(parseInt(value.toString(), 10))}>
        {minuteItems}
      </PickerIOS>
    </View>
  );
};

export default TimePicker;
