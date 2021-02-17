import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ModalProps,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import appStyles from '../app-styles';
import colors from '../colors';

const AreaButton = (props: {name: string}) => {
  return (
    <TouchableOpacity onPress={() => console.log(`${props.name} pressed.`)}>
      <View style={styles.areaButton}>
        <Text style={styles.areaButtonText}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NextButton = () => {
  return (
    <TouchableOpacity>
      <View style={appStyles.button}>
        <Text>Next</Text>
      </View>
    </TouchableOpacity>
  );
};

const QuickSessionModal = (props: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <Text style={styles.headerText}>Quick Session</Text>
            <Text>What would you like to work on today?</Text>
          </View>
          <View style={styles.areasView}>
            <AreaButton name="Speed &amp; Agility" />
            <AreaButton name="Creativity &amp; Improvisation" />
            <AreaButton name="Style &amp; Vocabulary" />
            <AreaButton name="Precision &amp; Timekeeping" />
          </View>
          <View>
            <NextButton />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-around',
  },
  textView: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
  headerText: {
    fontSize: 24,
  },
  areasView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  areaButton: {
    margin: 10,
    height: 130,
    width: 130,
    // flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default QuickSessionModal;
