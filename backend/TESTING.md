# Backend - Testing Documentation

This document outlines the testing setup and unit tests implemented for the Backend API.

## Testing Framework

- **Vitest**: Test runner.
- **Node Environment**: Configured in `vitest.config.js`.

## Setup

- Global mocks for Supabase and Cloudinary in `src/test/setup.js`.
- `process.env` variables are mocked during tests to avoid initialization errors.

## Running Tests

Run all unit tests using:
\`bash
npm test
\`

## Controllers Tested

1. **UserController**:
   - Registration logic (success, missing fields, user exists).
   - Login logic (success, invalid credentials).
2. **ProductController**:
   - Get all products.
   - Get bestsellers.
   - Get single product by ID (success, 404, invalid ID).
3. **CartController**:
   - Get user cart.
   - Add to cart (success, validation).

## Mocking Strategy
We use `vi.mock()` to isolate controllers from their services and database connections. This ensures tests are fast and do not require a running database or internet connection.
