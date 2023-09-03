import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormItem from './FormItem';
import { useForm } from 'react-hook-form';
import * as formHooks from 'react-hook-form';
import { TextInput } from 'react-native-paper';

// Mock the useController hook
jest.mock('react-hook-form', () => {
  return {
    ...jest.requireActual('react-hook-form'),
    useController: jest.fn(),
  };
});

jest.useFakeTimers();

const ComponentWithFormItem = () => {
  const { control } = formHooks.useForm();

  return (
    <FormItem
      name="exercise"
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          {...field}
          testID="FORM_NAME_INPUT"
          onBlur={field.onBlur}
          onChangeText={field.onChange}
          error={!!fieldState.error}
        />
      )}
    />
  );
};

describe('FormItem Component', () => {
  it('should render component with', () => {
    // @ts-ignore
    jest.spyOn(formHooks, 'useController').mockImplementation(() => ({
      field: { onBlur: () => {}, onChange: () => {}, value: 'some value' },
      fieldState: {
        isDirty: false,
      },
    }));
    const { getByTestId } = render(<ComponentWithFormItem />);

    const input = getByTestId('FORM_NAME_INPUT');

    expect(input).toBeTruthy();
  });

  it('renders the component with error message', () => {
    // @ts-ignore
    jest.spyOn(formHooks, 'useController').mockImplementation(() => ({
      field: { onBlur: () => {}, onChange: () => {}, value: 'some value' },
      fieldState: {
        error: {
          type: 'maxLength',
        },
        isDirty: true,
      },
    }));

    const { queryByTestId } = render(<ComponentWithFormItem />);
    const el = queryByTestId('HELPER_TEXT_ERROR');

    expect(el).toBeTruthy();
  });
});
