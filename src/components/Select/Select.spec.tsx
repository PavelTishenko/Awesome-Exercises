import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import Select from './Select';

const TYPE_TEST_ID = 'TYPE_TEST_ID';

describe('Select Component', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders the component with default props', () => {
    const { getByTestId } = render(
      <Select
        options={options}
        value=""
        onChange={() => {}}
        testId={TYPE_TEST_ID}
        inputTestId="TYPE_INPUT_TEST_ID"
      />,
    );

    const selectComponent = getByTestId(TYPE_TEST_ID);
    expect(selectComponent).toBeDefined();
  });

  it('updates the value when an option is selected', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Select
        options={options}
        value=""
        onChange={onChangeMock}
        testId={TYPE_TEST_ID}
        inputTestId="TYPE_INPUT_TEST_ID"
      />,
    );

    const input = getByTestId('TYPE_INPUT_TEST_ID');

    fireEvent.press(input);

    const picker = getByTestId('PICKER');

    expect(picker).toBeTruthy();

    fireEvent(input, 'onValueChange', options[0].label);

    expect(onChangeMock).toHaveBeenCalledWith('Option 1');
  });
});
