import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PriceBlock from './PriceBlock';

test('increment button increases count by 1 and changes total price', () => {
  render(<PriceBlock title="Book Title" price={10} cartItems={[]} theme="light" />);
  
  const incrementButton = screen.getByTestId('increment-btn');
  const countLabel = screen.getByTestId('count-label');
  const totalPriceElement = screen.getByTestId('totalPrice');

  
  expect(countLabel.textContent).toBe('1');
  expect(totalPriceElement.textContent).toBe('$10.00');

  
  fireEvent.click(incrementButton);
   
  expect(countLabel.textContent).toBe('2');
  expect(totalPriceElement.textContent).toBe('$20.00');
});

test('input value changes total price', () => {
  render(<PriceBlock title="Book Title" price={10} cartItems={[]} theme="light" />);
  
  const inputElement = screen.getByTestId('count-input');
  const totalPriceElement = screen.getByTestId('totalPrice');

  expect(totalPriceElement.textContent).toBe('$10.00');

  fireEvent.change(inputElement, { target: { value: '5' } });

  expect(totalPriceElement.textContent).toBe('$50.00');
});