import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import QuickSessionButton from './QuickSessionButton';
import QuickSessionModal from './quick-session-modal/QuickSessionModal';
import {FocusArea} from '../../classes';

const areas = [
  new FocusArea('Speed & Agility'),
  new FocusArea('Creativity & Improvisation'),
  new FocusArea('Style & Vocabulary'),
  new FocusArea('Precision & Timekeeping'),
];

const HomeScreen = () => {
  const [quickSessionModalVisible, setQuickSessionModalVisible] = useState(
    false,
  );

  return (
    <View style={styles.container}>
      <QuickSessionModal visible={quickSessionModalVisible} areas={areas} />
      <QuickSessionButton onPress={() => setQuickSessionModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
