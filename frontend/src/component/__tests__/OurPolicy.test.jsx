import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OurPolicy from '../OurPolicy';

describe('OurPolicy Component', () => {
  it('renders all policy items', () => {
    render(<OurPolicy />);
    
    expect(screen.getByText('Easy Exchange Policy')).toBeInTheDocument();
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
    expect(screen.getByText('Best Customer Support')).toBeInTheDocument();
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });
});
