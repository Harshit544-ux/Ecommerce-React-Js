import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders footer sections correctly', () => {
    render(<Footer />);
    
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('COMPANY')).toBeInTheDocument();
    expect(screen.getByText('GET IN TOUCH')).toBeInTheDocument();
    expect(screen.getByText(/Copyright © 2025/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText('harshitsri08@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('+91 7800022658')).toBeInTheDocument();
  });
});
