import React from 'react';
import { render } from '@testing-library/react-native';
import List from './List';

describe('List Component', () => {
  it('renders a list of items', () => {
    const items = [
      { name: 'Exercise 1' },
      { name: 'Exercise 2' },
      { name: 'Exercise 3' },
    ];

    const { getByText } = render(<List items={items} />);

    expect(getByText('Exercise 1')).toBeTruthy();
    expect(getByText('Exercise 2')).toBeTruthy();
    expect(getByText('Exercise 3')).toBeTruthy();
  });
});
