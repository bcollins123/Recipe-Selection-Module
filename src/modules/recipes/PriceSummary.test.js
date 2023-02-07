import React from 'react';
import ThemeProvider from '../../components/ThemeProvider';
import PriceSummary from './PriceSummary';
import { render, screen } from '@testing-library/react';

const mockSummaryData = [
  {
    id: 1,
    name: 'Chicken Sausage & Spinach Ravioli',
    price: '$17.98',
  },
  {
    id: 2,
    name: 'Gouda Vibes Burgers',
    price: '$17.98',
  },
  {
    id: 3,
    name: 'Figgy Balsamic Pork',
    price: '$17.98',
  },
  {
    id: 4,
    name: 'Shipping',
    price: '$12.98',
  },
];

const PriceSummary1Factory = () => {
  render(
    <ThemeProvider>
      <PriceSummary summary={[]} totalPrice="0" />
    </ThemeProvider>
  );
};
const PriceSummary2Factory = () => {
  render(
    <ThemeProvider>
      <PriceSummary summary={mockSummaryData} totalPrice="$66.92" />
    </ThemeProvider>
  );
};

describe('PriceSummary', () => {
  it('should show empty list and notification text', () => {
    PriceSummary1Factory();
    expect(screen.getByText('No recipes selected.')).toBeInTheDocument();
  });

  it('should show summary list with total price', () => {
    PriceSummary2Factory();
    expect(screen.getByTestId('price-summary-list').childNodes).toHaveLength(mockSummaryData.length + 1);
    expect(screen.getByTestId('total-price')).toHaveTextContent("$66.92");
  });
});
