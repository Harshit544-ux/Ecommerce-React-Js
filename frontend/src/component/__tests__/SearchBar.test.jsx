import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import SearchBar from '../SearchBar';

// Mock useLocation since it's used in SearchBar
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({ pathname: '/collection' }),
  };
});

describe('SearchBar Component', () => {
  const mockContext = {
    search: '',
    setSearch: vi.fn(),
    showSearch: true,
    setShowSearch: vi.fn(),
  };

  it('renders when showSearch is true', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <SearchBar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('does not render when showSearch is false', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={{ ...mockContext, showSearch: false }}>
          <SearchBar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByPlaceholderText('Search products...')).not.toBeInTheDocument();
  });

  it('calls setSearch on input change', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <SearchBar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockContext.setSearch).toHaveBeenCalledWith('test');
  });

  it('clears search when clear button is clicked', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={{ ...mockContext, search: 'test' }}>
          <SearchBar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const clearButton = screen.getByAltText('Clear');
    fireEvent.click(clearButton);
    expect(mockContext.setSearch).toHaveBeenCalledWith('');
  });

  it('calls setShowSearch(false) when close button is clicked', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <SearchBar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const closeButton = screen.getByAltText('Close');
    fireEvent.click(closeButton);
    expect(mockContext.setShowSearch).toHaveBeenCalledWith(false);
  });
});
