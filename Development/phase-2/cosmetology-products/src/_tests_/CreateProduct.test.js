import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('2nd Deliverable', () => {
    test('adds a new product when the form is submitted', async () => {
        global.setFetchResponse(global.baseProducts)
        const { getByPlaceholderText, findByText, getByText } = render(<App />)

        const firstProduct = {name: 'foo', image: 'foo_product_image_url', price: '10'}
    
        global.setFetchResponse(firstProduct)
    
        fireEvent.change(getByPlaceholderText('Product name'), { target: { value: firstProduct.name } });
        fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: firstProduct.image } });
        fireEvent.change(getByPlaceholderText('Price'), { target: { value: firstProduct.price } });
        fireEvent.click(getByText('Add Product'))

        expect(fetch).toHaveBeenCalledWith("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(firstProduct),
        })
    
        const newProduct = await findByText('foo');
        expect(newProduct).toBeInTheDocument();

        const secondProduct = {name: 'bar', image: 'bar_product_image_url', price: '5'}
    
        global.setFetchResponse(secondProduct)
    
        fireEvent.change(getByPlaceholderText('product name'), { target: { value: secondProduct.name } });
        fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: secondProduct.image } });
        fireEvent.change(getByPlaceholderText('Price'), { target: { value: secondProduct.price } });
        fireEvent.click(getByText('Add Product'))
    
        expect(fetch).toHaveBeenCalledWith("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(secondProduct),
        })

        const nextProduct = await findByText('bar');
        expect(nextProduct).toBeInTheDocument();
    });
})