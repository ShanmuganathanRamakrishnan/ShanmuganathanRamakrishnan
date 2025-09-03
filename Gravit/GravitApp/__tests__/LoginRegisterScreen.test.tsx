import React from 'react';
import { render } from '@testing-library/react-native';
import LoginRegisterScreen from '@/screens/Auth/LoginRegisterScreen';

describe('LoginRegisterScreen', () => {
  it('renders correctly', () => {
    const tree = render(<LoginRegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});