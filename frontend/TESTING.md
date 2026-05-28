# Testing Documentation

This document outlines the testing setup and unit tests implemented for the frontend components of the Ecommerce project.

## Testing Framework

We use **Vitest** as our primary test runner, along with **React Testing Library** for component testing.

### Libraries Used:
- **Vitest**: A Vite-native testing framework.
- **React Testing Library**: For rendering components and simulating user interactions.
- **jsdom**: A headless browser environment for running tests in Node.js.
- **jest-dom**: Custom Jest matchers for DOM state assertions.

## Setup Details

- **Configuration**: `vite.config.js` is updated with a `test` block.
- **Global Setup**: `src/test/setup.js` handles environment setup and cleanup after each test.
- **Test Script**: Added `"test": "vitest"` to `package.json`.

## Running Tests

To run all unit tests, use the following command in the `frontend` directory:

```bash
npm test
```

To run tests with a UI dashboard:
```bash
npx vitest --ui
```

## Components Tested

Unit tests have been added for all components in `src/component/`:

1.  **Navbar**: Navigation links, cart count display, search toggle, and authentication/logout logic.
2.  **SearchBar**: Visibility toggle, search input handling, and clearing/closing functionality.
3.  **ProductItem**: Rendering of product details (name, price, image) and navigation links.
4.  **LatestCollection**: Displays the first 10 products from the context.
5.  **BestSeller**: Filters and displays products marked as bestsellers.
6.  **RelatedProduct**: Filters products based on category and subcategory.
7.  **NewsLetterBox**: Form rendering and basic submission handling.
8.  **OurPolicy**: Static rendering of store policies.
9.  **Hero**: Rendering of the hero section content.
10. **Footer**: Company info and contact details.
11. **Title**: Dynamic text rendering.
12. **ProtectedRoute**: Authentication-based route guarding.
13. **SessionExpiredModal**: Displaying session expiry alerts and navigation to login.

## Test Location

All unit tests are located in `src/component/__tests__/`.
