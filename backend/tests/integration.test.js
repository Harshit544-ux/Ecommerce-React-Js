import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import * as userServices from '../services/userServices.js';
import * as productServices from '../services/productService.js';

vi.mock('../services/userServices.js');
vi.mock('../services/productService.js');
vi.mock('../config/cloudinary.js', () => ({
  default: vi.fn(),
  uploadToCloudinary: vi.fn(),
}));

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /products should return 200 and product list', async () => {
    productServices.getAllProduct.mockResolvedValue({ data: [], error: null });
    
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /login should return 200 on valid credentials', async () => {
    userServices.loginUserService.mockResolvedValue({ id: '1', email: 'test@test.com' });

    const res = await request(app)
      .post('/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
