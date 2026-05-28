import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import BestSeller from '../BestSeller';

describe('BestSeller Component', () => {
  const mockProducts = [
    { id: 1, name: 'Best 1', price: 100, images: ['img1.jpg'], bestseller: true },
    { id: 2, name: 'Normal 1', price: 110, images: ['img2.jpg'], bestseller: false },
    { id: 3, name: 'Best 2', price: 120, images: ['img3.jpg'], bestseller: true },
  ];

  const mockContext = {
    products: mockProducts,
    currency: '$',
  };

  it('renders only bestseller products', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <BestSeller />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('BEST')).toBeInTheDocument();
    expect(screen.getByText('SELLERS')).toBeInTheDocument();
    
    expect(screen.getByText('Best 1')).toBeInTheDocument();
    expect(screen.getByText('Best 2')).toBeInTheDocument();
    expect(screen.queryByText('Normal 1')).not.toBeInTheDocument();
  });
});
