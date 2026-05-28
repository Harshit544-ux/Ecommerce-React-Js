import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import ProductItem from '../ProductItem';

describe('ProductItem Component', () => {
  const mockContext = {
    currency: '$',
  };

  const product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    image: ['test-image.jpg'],
  };

  it('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <ProductItem {...product} />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test-image.jpg');
    expect(img).toHaveAttribute('alt', 'Test Product');
  });

  it('renders fallback image if image is missing', () => {
    const productWithoutImage = { ...product, image: null };
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <ProductItem {...productWithoutImage} />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/fallback.jpg');
  });

  it('links to the correct product page', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <ProductItem {...product} />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });
});
