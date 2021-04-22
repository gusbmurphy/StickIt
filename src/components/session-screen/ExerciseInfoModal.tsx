import React from 'react';
import {ModalProps, Modal, Text} from 'react-native';

export const ExerciseInfoModal = (props: ModalProps) => {
  return (
    <Modal testID={exerciseInfoModalTestId}>
      <Text>Exercise Info Modal</Text>
    </Modal>
  );
};

export const exerciseInfoModalTestId = 'exercise-info-modal';
