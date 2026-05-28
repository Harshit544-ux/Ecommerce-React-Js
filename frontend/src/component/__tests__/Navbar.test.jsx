import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import Navbar from '../Navbar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar Component', () => {
  const mockContext = {
    setShowSearch: vi.fn(),
    getCartCount: vi.fn().mockReturnValue(5),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders logo and navigation links', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Navbar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Collection')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays cart count from context', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Navbar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls setShowSearch(true) when search icon is clicked', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Navbar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const searchIcon = screen.getByAltText('search');
    fireEvent.click(searchIcon);
    expect(mockContext.setShowSearch).toHaveBeenCalledWith(true);
  });

  it('shows login link when not logged in', () => {
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Navbar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const profileLinks = screen.getAllByRole('link').filter(link => link.getAttribute('href') === '/login');
    expect(profileLinks.length).toBeGreaterThan(0);
  });

  it('shows dropdown when logged in', () => {
    localStorage.setItem('auth-token', 'fake-token');
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Navbar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    localStorage.setItem('auth-token', 'fake-token');
    render(
      <MemoryRouter>
        <ShopContext.Provider value={mockContext}>
          <Navbar />
        </ShopContext.Provider>
      </MemoryRouter>
    );

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem('auth-token')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
