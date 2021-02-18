import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ModalProps,
  TouchableOpacityProps,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FocusArea} from '../../../classes';
import appStyles from '../../app-styles';
import colors from '../../colors';
import StepIndicator from '../StepIndicator';

const AreaButton = (props: {
  name: string;
  selected: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={() => props.handlePress()}>
      <View
        style={[
          styles.areaButton,
          props.selected
            ? styles.areaButtonSelected
            : styles.areaButtonUnselected,
        ]}>
        <Text
          style={[
            styles.areaButtonText,
            props.selected ? styles.areaButtonTextSelected : null,
          ]}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NextButton = () => {
  return (
    <TouchableOpacity>
      <View style={appStyles.button}>
        <Text style={appStyles.buttonText}>Next</Text>
      </View>
    </TouchableOpacity>
  );
};

const QuickSessionModal = (props: ModalProps & {areas: FocusArea[]}) => {
  const [selectedAreaId, setSelectedAreaId] = useState('');

  const areaButtons = props.areas.map((area, i) => (
    <AreaButton
      name={area.name}
      key={i}
      selected={selectedAreaId === area.id}
      handlePress={() =>
        selectedAreaId !== area.id
          ? setSelectedAreaId(area.id)
          : setSelectedAreaId('')
      }
    />
  ));

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
          <View style={styles.areasView}>{areaButtons}</View>
          <View>
            <NextButton />
            <StepIndicator currentStep={2} totalSteps={5} />
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
  },
  headerText: {
    fontSize: 24,
  },
  areasView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaButton: {
    margin: 10,
    padding: 5,
    height: 130,
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaButtonUnselected: {
    backgroundColor: colors.secondary,
  },
  areaButtonSelected: {
    backgroundColor: colors.primary,
  },
  areaButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  areaButtonTextSelected: {
    color: 'white',
  },
});

export default QuickSessionModal;
