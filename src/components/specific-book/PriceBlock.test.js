import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PriceBlock from './PriceBlock';

test('increment button increases count by 1', () => {
  const { getByTestId } = render(<PriceBlock title="Book Title" price={10} cartItems={[]} theme="light" />);
  const incrementButton = getByTestId('increment-btn');
  const countLabel = getByTestId('count-label');

  fireEvent.click(incrementButton);
  expect(countLabel.textContent).toBe('2');
});

test('input value changes total price', () => {
  const { getByTestId } = render(<PriceBlock title="Book Title" price={10} cartItems={[]} theme="light" />);
  const inputElement = getByTestId('count-input');
  const totalPriceElement = getByTestId('totalPrice');

  fireEvent.change(inputElement, { target: { value: '5' } });
  expect(totalPriceElement.textContent).toBe('$50.00');
});