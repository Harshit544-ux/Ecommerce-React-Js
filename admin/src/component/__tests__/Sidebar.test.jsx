import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Add Items/i)).toBeInTheDocument();
    expect(screen.getByText(/List Items/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Items/i)).toBeInTheDocument();
  });

  it('links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Add Items/i).closest('a')).toHaveAttribute('href', '/add');
    expect(screen.getByText(/List Items/i).closest('a')).toHaveAttribute('href', '/list');
    expect(screen.getByText(/Order Items/i).closest('a')).toHaveAttribute('href', '/orders');
  });
});
