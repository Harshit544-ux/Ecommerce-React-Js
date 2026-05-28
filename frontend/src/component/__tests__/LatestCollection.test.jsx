import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import LatestCollection from '../LatestCollection';

describe('LatestCollection Component', () => {
  const mockProducts = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 100 + i,
    images: [`img${i + 1}.jpg`],
  }));

  const mockContext = {
    products: mockProducts,
    currency: '$',
  };

  it('renders the title and description', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <LatestCollection />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('LATEST')).toBeInTheDocument();
    expect(screen.getByText('COLLECTIONS')).toBeInTheDocument();
    expect(screen.getByText(/Unlock the latest collections/i)).toBeInTheDocument();
  });

  it('renders the first 10 products', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <LatestCollection />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    // Should find exactly 10 product names
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Product ${i}`)).toBeInTheDocument();
    }
    
    // Product 11 should not be in the document
    expect(screen.queryByText('Product 11')).not.toBeInTheDocument();
  });
});
