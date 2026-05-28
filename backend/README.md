# Ecommerce - Backend API

A Node.js/Express backend for the Ecommerce project, using Supabase for the database and Cloudinary for image storage.

## Features
- **User Authentication**: JWT-based login and registration.
- **Product Management**: CRUD operations for products.
- **Cart System**: User-specific cart management.
- **Payment Integration**: Stripe and Razorpay (configured).

## Getting Started

### Installation
1. Navigate to the backend directory:
   \`bash
   cd backend
   \`
2. Install dependencies:
   \`bash
   npm install
   \`

### Environment Setup
Create a `.env` file based on `.env.example` and provide:
- `SUPABASE_URL` & `SUPABASE_KEY`
- `CLOUDINARY_*` credentials
- `JWT_SECRET`
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`

### Running the Server
\`bash
npm start
\`
or for development:
\`bash
npm run server
\`

## Testing
We use **Vitest** for backend unit testing.
\`bash
npm test
\`

For more details, see [TESTING.md](./TESTING.md).
