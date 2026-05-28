import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SessionExpiredModal from '../SessionExpiredModal';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SessionExpiredModal Component', () => {
  it('renders correctly when open', () => {
    render(
      <MemoryRouter>
        <SessionExpiredModal isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('Your session has expired')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <MemoryRouter>
        <SessionExpiredModal isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Your session has expired')).not.toBeInTheDocument();
  });

  it('calls onClose and navigates to login on click', () => {
    const mockOnClose = vi.fn();
    render(
      <MemoryRouter>
        <SessionExpiredModal isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const loginBtn = screen.getByText('Login');
    fireEvent.click(loginBtn);

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
