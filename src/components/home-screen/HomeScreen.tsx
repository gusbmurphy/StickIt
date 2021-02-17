import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import QuickSessionButton from './QuickSessionButton';

const HomeScreen = () => {
  const [] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <QuickSessionButton />
    </View>
  );
};

export default HomeScreen;
