import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('4th Deliverable', () => {
  test('filters products by name on search', async () => {
    global.setFetchResponse(global.baseProducts)
    const { getByPlaceholderText, queryAllByTestId } = render(<App />);
    const searchInput = getByPlaceholderText('Type a name to search...');
    fireEvent.change(searchInput, { target: { value: 'aloe' } });

    await waitFor(() => {
      const filteredProducts = queryAllByTestId('product-item');
      expect(filteredProducts).toHaveLength(1);
    });
    
    fireEvent.change(searchInput, { target: { value: 'p' } });
    
    await waitFor(() => {
      const filteredProduts = queryAllByTestId('product-item');
      expect(filteredProducts).toHaveLength(3);
    });
  });
})