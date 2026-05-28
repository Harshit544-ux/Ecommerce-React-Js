import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import RelatedProduct from '../RelatedProduct';

describe('RelatedProduct Component', () => {
  const mockProducts = [
    { id: 1, name: 'P1', price: 100, images: ['img1.jpg'], category: 'Men', subcategory: 'Topwear' },
    { id: 2, name: 'P2', price: 110, images: ['img2.jpg'], category: 'Men', subcategory: 'Topwear' },
    { id: 3, name: 'P3', price: 120, images: ['img3.jpg'], category: 'Women', subcategory: 'Topwear' },
  ];

  const mockContext = {
    products: mockProducts,
    currency: '$',
  };

  it('filters related products by category and subcategory', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <RelatedProduct category="Men" subCategory="Topwear" />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('P2')).toBeInTheDocument();
    expect(screen.queryByText('P3')).not.toBeInTheDocument();
  });
});
