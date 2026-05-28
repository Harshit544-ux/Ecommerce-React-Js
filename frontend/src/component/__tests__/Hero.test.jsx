import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders correctly', () => {
    render(<Hero />);
    
    expect(screen.getByText('OUR SELLERS')).toBeInTheDocument();
    expect(screen.getByText('Latest Arrivals')).toBeInTheDocument();
    expect(screen.getByText('SHOP NOW')).toBeInTheDocument();
    expect(screen.getByAltText('Hero')).toBeInTheDocument();
  });
});
