import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Icon from './Icon';

jest.mock('@/assets/svg/cardio', () => 'mocked-cardio-svg');

describe('Icon Component', () => {
  it('renders the correct SVG based on exercise type', async () => {
    const { getByTestId } = render(<Icon type="cardio" />);
    const svgElement = getByTestId('img');

    expect(svgElement.props.children.props.testID).toBe('TEST_ID_ICON');
  });
});
