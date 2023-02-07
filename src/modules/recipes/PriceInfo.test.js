import React from 'react';
import ThemeProvider from '../../components/ThemeProvider';
import PriceInfo from './PriceInfo';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const priceInfoFactory = () => {
  render(
    <ThemeProvider>
      <PriceInfo summary={[]} totalPrice="0" />
    </ThemeProvider>
  );
};

describe('PriceInfo', () => {
  it('should show the tooltip once the button is clicked', () => {
    priceInfoFactory();
    act(() => screen.getByTestId('price-info-button').click());
    expect(screen.getByTestId('price-info-tooltip')).toBeInTheDocument();
  });

  it('should hide the tooltip if user click outside of the component', () => {
    priceInfoFactory();
    userEvent.click(document.body);
    expect(screen.queryByTestId('price-info-tooltip')).toBeNull();
  });
});
