import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import { ResultScreen } from '.';

const RESULT_CONTAINER_TEST_ID = 'RESULT_CONTAINER_TEST_ID';

jest.useFakeTimers();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        params: [],
      },
    }),
  };
});

describe('Result Screen', () => {
  it('should render screen', async () => {
    const { getByTestId } = render(<ResultScreen />);

    const screenContainer = getByTestId(RESULT_CONTAINER_TEST_ID);

    await waitFor(() => expect(screenContainer).toBeTruthy());
  });
});
