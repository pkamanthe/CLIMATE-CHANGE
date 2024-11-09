import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('3rd Deliverable', () => {
  test('marks a plant as sold out', async () => {
    global.setFetchResponse(global.baseProducts)

    const { findAllByTestId, findByText } = render(<App />);

   
    const productItems = await findAllByTestId('product-item');
    expect(productItems).toHaveLength(baseProducts.length);

    const firstProductItem = productItems[0];

    
    const inStockButton = within(firstProducttItem).getByText('In Stock');
    fireEvent.click(inStockButton);

    
    const outOfStockButton = await findByText('Out of Stock');
    expect(outOfStockButton).toBeInTheDocument();
  });
})