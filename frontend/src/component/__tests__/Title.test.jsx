import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Title from '../Title';

describe('Title Component', () => {
  it('renders correctly with text1 and text2', () => {
    render(<Title text1="LATEST" text2="COLLECTIONS" />);
    
    expect(screen.getByText('LATEST')).toBeInTheDocument();
    expect(screen.getByText('COLLECTIONS')).toBeInTheDocument();
  });

  it('applies correct classes for styling', () => {
    const { container } = render(<Title text1="LATEST" text2="COLLECTIONS" />);
    const div = container.firstChild;
    expect(div).toHaveClass('inline-flex gap-3 items-center mb-3');
  });
});
