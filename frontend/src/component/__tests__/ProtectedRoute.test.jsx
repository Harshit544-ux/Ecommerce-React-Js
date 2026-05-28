import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders children if authenticated', () => {
    localStorage.setItem('auth-token', 'fake-token');
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/protected" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to home if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/protected" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
