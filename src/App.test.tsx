import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const component = render(<App />);
  expect(component).toBeDefined();
});
