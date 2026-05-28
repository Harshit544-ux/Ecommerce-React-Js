import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NewsLetterBox from '../NewsLetterBox';

describe('NewsLetterBox Component', () => {
  it('renders correctly', () => {
    render(<NewsLetterBox />);
    
    expect(screen.getByText(/Subscribe now and get 10% off/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
  });

  it('prevents default form submission', () => {
    render(<NewsLetterBox />);
    const form = screen.getByPlaceholderText('Enter your email').closest('form');
    const submitEvent = fireEvent.submit(form);
    
    expect(submitEvent).toBe(false); // fireEvent.submit returns false if preventDefault() was called
  });
});
