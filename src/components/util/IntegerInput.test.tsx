import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import IntegerInput from './IntegerInput';

describe('Integer Input', () => {
  test('any input that is not a digit is not passed to the onChange function', () => {
    const inputId = 'inputId';
    const mockOnChange = jest.fn();

    const {getByTestId} = render(
      <IntegerInput testID={inputId} onChange={mockOnChange} value={0} />,
    );

    fireEvent.changeText(getByTestId(inputId), 'abc5');
    expect(mockOnChange).toBeCalledWith(5);
  });
  test("deleting all the characters will pass a '0' to the onChange function", () => {
    const inputId = 'inputId';
    const mockOnChange = jest.fn(() => {});

    const {getByTestId} = render(
      <IntegerInput testID={inputId} onChange={mockOnChange} value={0} />,
    );

    fireEvent.changeText(getByTestId(inputId), '');
    expect(mockOnChange).toBeCalledWith(0);
  });
});
