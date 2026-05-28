import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../Navbar';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Navbar Component', () => {
  it('renders logo and logout button', () => {
    render(<Navbar setToken={vi.fn()} />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls setToken on logout', () => {
    const setToken = vi.fn();
    render(<Navbar setToken={setToken} />);
    
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);
    
    expect(setToken).toHaveBeenCalledWith('');
  });
});
