import React from 'react';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Form from './Form';
import { store } from '@/store/store';

const FORM_ICON_ID = 'FORM_ICON';
const FORM_CONTAINER = 'FORM_CONTAINER';

jest.useFakeTimers();

const Providers = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
};

describe('Form', () => {
  it('Should render Icon', async () => {
    const { getByTestId } = render(
      <Providers>
        <Form />
      </Providers>,
    );
    const icon = getByTestId(FORM_ICON_ID);

    await waitFor(() => expect(icon).toBeTruthy());
  });
  it('Should render Form container', async () => {
    const { getByTestId } = render(
      <Providers>
        <Form />
      </Providers>,
    );

    const formContainer = getByTestId(FORM_CONTAINER);

    await waitFor(() => expect(formContainer).toBeTruthy());
  });
});
