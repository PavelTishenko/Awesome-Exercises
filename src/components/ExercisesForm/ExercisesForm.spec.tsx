import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ExercisesForm from './ExercisesForm';

const FORM_NAME_INPUT = 'FORM_NAME_INPUT';
const INPUT_PLACEHOLDER = 'Enter exercise name e.g. Press';
const INPUT_VALUE = 'Check';
const TYPE_TEST_ID = 'TYPE_TEST_ID';

jest.useFakeTimers();

const Providers = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
};

describe('Exercises Form', () => {
  it('Should render Exercises Form name input', async () => {
    const { getByTestId } = render(
      <Providers>
        <ExercisesForm />
      </Providers>,
    );

    const input = getByTestId(FORM_NAME_INPUT);

    await waitFor(() => expect(input).toBeTruthy());
  });

  it('Input should has value after typing', async () => {
    const { getByTestId } = render(
      <Providers>
        <ExercisesForm />
      </Providers>,
    );

    const input = getByTestId(FORM_NAME_INPUT);

    await waitFor(() => expect(input).toBeTruthy());

    fireEvent.changeText(
      screen.getByPlaceholderText(INPUT_PLACEHOLDER),
      INPUT_VALUE,
    );

    expect(screen.getByDisplayValue(INPUT_VALUE)).toBeTruthy();
  });

  it('Should render select container', async () => {
    const { getByTestId } = render(
      <Providers>
        <ExercisesForm />
      </Providers>,
    );

    const selectContainer = getByTestId(TYPE_TEST_ID);

    await waitFor(() => expect(selectContainer).toBeTruthy());
  });
});
