import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {areaButtonA11yLabel} from './AreaButton';
import React from 'react';
import {FocusArea} from '../../../types';
import {buttonStyles, colors, fontSizes} from '../../../styles';
import {v4 as uuid} from 'uuid';

const AreaButton = (props: {
  name: string;
  selected: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.selected ? styles.buttonSelected : styles.buttonUnselected,
      ]}
      onPress={() => props.handlePress()}
      accessibilityLabel={areaButtonA11yLabel(props.name)}>
      <Text
        style={[
          styles.buttonText,
          props.selected ? styles.buttonTextSelected : null,
        ]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonSpacer = () => <View style={styles.buttonSpacer} />;

export const AreaButtonCollection = (props: {
  areas: FocusArea[];
  selectedArea: FocusArea | null;
  setSelectedArea: (area: FocusArea | null) => void;
}) => {
  const buttons = props.areas.map((area, i) => (
    <AreaButton
      name={area.name}
      key={i}
      selected={props.selectedArea?.id === area.id}
      handlePress={() =>
        props.selectedArea?.id !== area.id
          ? props.setSelectedArea(area)
          : props.setSelectedArea(null)
      }
    />
  ));

  // Create an array of arrays that will each have a max of two buttons
  // from which we'll use to create the rows in the final component.
  let buttonGroupings: Element[][] = [];
  for (let i = 0; i < buttons.length; i++) {
    if (i % 2 === 0) {
      buttonGroupings.push([buttons[i]]);
    } else {
      buttonGroupings[buttonGroupings.length - 1].push(buttons[i]);
    }
  }

  // Iterate through the groupings, and add spacers either between the two
  // buttons, or on either side of a single button.
  buttonGroupings.forEach((grouping) => {
    if (grouping.length > 1) {
      grouping.splice(1, 0, [
        <ButtonSpacer key={uuid()} />,
        <ButtonSpacer key={uuid()} />,
      ]);
    } else {
      grouping.push(<ButtonSpacer key={uuid()} />);
      grouping.unshift(<ButtonSpacer key={uuid()} />);
    }
  });

  const buttonRows = buttonGroupings.map((grouping, i) => (
    <View style={styles.buttonRow} key={i}>
      {grouping}
    </View>
  ));

  return <View style={styles.collectionView}>{buttonRows}</View>;
};

const gutterSize = 24;
const styles = StyleSheet.create({
  collectionView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 'auto',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: gutterSize,
  },
  button: {
    ...buttonStyles.default,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  buttonUnselected: {
    backgroundColor: colors.secondary,
  },
  buttonSelected: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    ...buttonStyles.text,
    color: colors.text,
    fontSize: fontSizes.medium,
  },
  buttonTextSelected: {
    color: 'white',
  },
  buttonSpacer: {
    width: gutterSize / 2,
  },
});

export const areaButtonA11yLabel = (areaName: string) =>
  `Select ${areaName} focus area`;
