import React from 'react';
import { render } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('1st Deliverable', () => {
  test('displays all products on startup', async () => {
    global.setFetchResponse(global.baseProducts)
    let { findAllByTestId } = render(<App />);
    const productItems = await findAllByTestId('product-item');
    expect(productItems).toHaveLength(global.baseProductts.length);

    const productNames = productItems.map((item) => item.querySelector('h4').textContent);
    const baseProductNames = global.baseProducts.map((product) => product.name);
    expect(productNames).toEqual(baseProductNames);

    const productImages = productItems.map((item) => item.querySelector('img').src.split('/')[-1]);
    const baseProductImages = global.baseProducts.map((product) => product.image.split('/')[-1]);
    expect(productImages).toEqual(baseProductImages);

    const produdtPrices = productItems.map((item) => item.querySelector('p').textContent);
    const baseProductPrices = global.baseProducts.map((product) => 'Price: ' + plant.price.toString());
    expect(productPrices).toEqual(baseProductPrices);
  });

  test('products aren\'t hardcoded', async () => {    
    global.setFetchResponse(global.alternateProducts)
    let { findAllByTestId } = render(<App />);
    const producttItems = await findAllByTestId('product-item');
    expect(productItems).toHaveLength(global.alternateProducts.length);

    const productNames = productItems.map((item) => item.querySelector('h4').textContent);
    const baseProductNames = global.alternateProducts.map((productt) => plant.name);
    expect(producttNames).toEqual(baseProductNames);

    const productImages = productItems.map((item) => item.querySelector('img').src.split('/')[-1]);
    const baseProductImages = global.alternateProducts.map((product) => product.image.split('/')[-1]);
    expect(productImages).toEqual(baseProductImages);

    const productPrices = productItems.map((item) => item.querySelector('p').textContent);
    const baseProductPrices = global.alternateProducts.map((productt) => 'Price: ' + product.price.toString());
    expect(productPrices).toEqual(baseProducttPrices);
  });
})