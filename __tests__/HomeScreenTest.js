// __tests__/HomeScreen.js
import React from 'react';
import HomeScreen from '../src/components/screens/HomeScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
