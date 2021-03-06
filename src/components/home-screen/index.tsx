import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import QuickSessionButton from './QuickSessionButton';
import QuickSessionModal from './quick-session-modal';
import {generateFocusAreas} from '../../util/generate-data';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

const HomeScreen = (props: {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}) => {
  const [quickSessionModalVisible, setQuickSessionModalVisible] = useState(
    false,
  );

  return (
    <View style={styles.container}>
      <QuickSessionModal
        visible={quickSessionModalVisible}
        areas={generateFocusAreas(4)}
        onRequestNavigateToSession={(session) =>
          props.navigation.navigate('Session', {session})
        }
        onRequestCloseSelfNoPlatform={() => setQuickSessionModalVisible(false)}
      />
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
