# Admin Panel - Testing Documentation

This document outlines the testing setup and unit tests implemented for the Admin Panel components.

## Testing Framework

- **Vitest**: Test runner.
- **React Testing Library**: Component testing.
- **jsdom**: Browser environment simulation.
- **jest-dom**: DOM assertions.

## Setup

- Configured in `vite.config.js`.
- Global setup in `src/test/setup.js`.
- Added `test` script to `package.json`.

## Running Tests

Run all unit tests using:
\`bash
npm test
\`

## Components Tested

1. **Navbar**: Logout functionality and logo rendering.
2. **Sidebar**: Navigation links to Add, List, and Order pages.
3. **Login**: Admin authentication form, input validation, and successful login handling.

## Bug Fixes Applied
- Added missing `toast` import in `Navbar.jsx`.
- Improved accessibility in `Login.jsx` by associating labels with inputs using `id` and `htmlFor`.
