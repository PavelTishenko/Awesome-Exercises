import React from 'react';
import { render } from '@testing-library/react-native';
import { ListItem } from './ListItem';
import { Exercise } from '@/api/types.api';

const exercise: Exercise = {
  name: 'Run',
  type: 'Cardio',
  muscle: 'Muscle',
  difficulty: 'elementary',
};

describe('List Item', () => {
  it('Should render item', async () => {
    const { getByTestId } = render(<ListItem exercise={exercise} />);

    expect(getByTestId('ITEM_CONTAINER_TEST_ID')).toBeTruthy();
  });
});
